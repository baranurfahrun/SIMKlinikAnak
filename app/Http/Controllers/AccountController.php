<?php

namespace App\Http\Controllers;

use App\Helpers\SIKCrypt;
use App\Models\Admin;
use App\Models\UserPegawai;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function index()
    {
        // Tentukan User Aktif
        $isAdmin = Auth::guard('admin')->check();
        $user = $isAdmin ? Auth::guard('admin')->user() : Auth::guard('pegawai')->user();

        // 1. Ambil Akun Admin
        $admins = Admin::all()->filter(function($a) use ($isAdmin, $user) {
            // Jika bukan admin, jangan perbolehkan lihat admin lain
            if (!$isAdmin) return false;
            return true;
        })->map(function($a) {
            return [
                'id' => $a->usere,
                'nama' => $a->nama,
                'username' => SIKCrypt::decrypt($a->usere),
                'role' => 'admin',
                'jabatan' => 'Super Admin',
                'status' => 'Aktif',
                'hak_akses' => $a->hak_akses
            ];
        });

        // 2. Ambil Akun Pegawai (Termasuk Dokter)
        $pegawais = UserPegawai::all()->filter(function($p) use ($isAdmin, $user) {
            // Jika bukan admin, hanya boleh lihat akunya sendiri
            if (!$isAdmin && $p->id_user !== $user->id_user) return false;
            return true;
        });

        $registeredNiks = $pegawais->pluck('nik')->filter()->toArray();

        $pegawaiList = $pegawais->map(function($p) {
            return [
                'id' => $p->id_user,
                'nama' => $p->nama_pegawai,
                'username' => SIKCrypt::decrypt($p->id_user),
                'role' => 'pegawai',
                'jabatan' => $p->jabatan ?? 'Pegawai Klinik',
                'status' => 'Aktif',
                'hak_akses' => $p->hak_akses
            ];
        });

        // 3. Ambil Dokter Belum Aktif (Hanya bisa dilihat ADMIN)
        $dokterList = collect([]);
        if ($isAdmin) {
            $dokters = \App\Models\Dokter::all();
            $dokterList = $dokters->filter(function($d) use ($registeredNiks) {
                return !in_array($d->kd_dokter, $registeredNiks);
            })->map(function($d) {
                return [
                    'id' => 'NEW_DOKTER_' . $d->kd_dokter,
                    'nama' => $d->nm_dokter,
                    'username' => $d->kd_dokter,
                    'role' => 'pegawai',
                    'jabatan' => 'Dokter',
                    'status' => 'Belum Aktif'
                ];
            });
        }

        return Inertia::render('Admin/AccountSetting', [
            'accounts' => $admins->concat($pegawaiList)->concat($dokterList)
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'new_username' => 'required|min:4',
            'new_password' => 'required|min:4',
            'role' => 'required|in:admin,pegawai,dokter',
            'nama' => 'required|string|max:100'
        ]);

        if (!Auth::guard('admin')->check()) {
            return redirect()->back()->withErrors(['error' => 'Hanya Super Admin yang bisa menambah akun baru!']);
        }

        $usernameEnc = SIKCrypt::encrypt($request->new_username);
        $passwordEnc = SIKCrypt::encrypt($request->new_password);

        // Cek Keunikan Username (Global)
        $existsInAdmin = Admin::where('usere', $usernameEnc)->exists();
        $existsInPegawai = UserPegawai::where('id_user', $usernameEnc)->exists();

        if ($existsInAdmin || $existsInPegawai) {
            return redirect()->back()->withErrors(['new_username' => 'Username ini sudah terdaftar di sistem!']);
        }

        if ($request->role === 'admin') {
            Admin::create([
                'usere' => $usernameEnc,
                'passworde' => $passwordEnc,
                'nama' => $request->nama
            ]);
        } else {
            $jabatan = $request->role === 'dokter' ? 'Dokter' : 'Staff Akses Sistem';
            UserPegawai::create([
                'id_user' => $usernameEnc,
                'password' => $passwordEnc,
                'nama_pegawai' => $request->nama,
                'jabatan' => $jabatan,
                'nik' => $request->new_username
            ]);
        }

        return redirect()->back()->with('success', 'Akun ' . $request->new_username . ' berhasil dibuat & siap digunakan!');
    }

    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'role' => 'required',
            'new_username' => 'required|min:4',
            'new_password' => ($request->id && strpos($request->id, 'NEW_DOKTER_') === 0) ? 'required|min:4' : 'nullable|min:4',
        ]);

        $isAdmin = Auth::guard('admin')->check();
        $currentUser = $isAdmin ? Auth::guard('admin')->user() : Auth::guard('pegawai')->user();
        $currentId = $isAdmin ? $currentUser->usere : $currentUser->id_user;

        if (!$isAdmin && $request->id !== $currentId) {
            return redirect()->back()->withErrors(['error' => 'Hanya Super Admin yang bisa mengelola akun orang lain!']);
        }

        $newUsernameEnc = SIKCrypt::encrypt($request->new_username);

        // Cek Keunikan Username Baru
        $existsInAdmin = Admin::where('usere', $newUsernameEnc)
            ->where('usere', '!=', (strpos($request->id, 'NEW_DOKTER_') === 0 ? '' : $request->id))
            ->exists();
        $existsInPegawai = UserPegawai::where('id_user', $newUsernameEnc)
            ->where('id_user', '!=', (strpos($request->id, 'NEW_DOKTER_') === 0 ? '' : $request->id))
            ->exists();

        if ($existsInAdmin || $existsInPegawai) {
            return redirect()->back()->withErrors(['new_username' => 'Username ini sudah digunakan akun lain!']);
        }

        // Logic Baru: Aktivasi Akun Dokter (Jika ID berawalan NEW_DOKTER_)
        if (strpos($request->id, 'NEW_DOKTER_') === 0) {
            $kd_dokter = str_replace('NEW_DOKTER_', '', $request->id);
            $dokter = \App\Models\Dokter::where('kd_dokter', $kd_dokter)->first();

            if (!$dokter) {
                return redirect()->back()->withErrors(['error' => 'Data dokter tidak ditemukan!']);
            }

            // Gunakan updateOrCreate agar jika NIK sudah ada, data DIGANTI (Replace), bukan ditambah baru
            UserPegawai::updateOrCreate(
                ['nik' => $kd_dokter],
                [
                    'id_user' => $newUsernameEnc,
                    'password' => SIKCrypt::encrypt($request->new_password),
                    'nama_pegawai' => $dokter->nm_dokter,
                    'jabatan' => 'Dokter',
                    'stts_nikah' => $dokter->stts_nikah,
                    'alamat' => $dokter->alamat,
                    'no_telp' => $dokter->no_telp,
                ]
            );

            return redirect()->back()->with('success', 'Akun ' . $dokter->nm_dokter . ' berhasil diaktifkan!');
        }

        // Update Akun Eksisting
        if ($request->role === 'admin') {
            $user = Admin::findOrFail($request->id);
            $user->usere = $newUsernameEnc;
            if ($request->filled('new_password')) {
                $user->passworde = SIKCrypt::encrypt($request->new_password);
            }
            $user->save();
        } else {
            $user = UserPegawai::findOrFail($request->id);
            $user->id_user = $newUsernameEnc;
            if ($request->filled('new_password')) {
                $user->password = SIKCrypt::encrypt($request->new_password);
            }
            $user->save();
        }

        return redirect()->back()->with('success', 'Akun ' . $request->new_username . ' berhasil diperbarui! 🤜💥🤛');
    }

    public function destroy(Request $request, $id)
    {
        if (!Auth::guard('admin')->check()) {
            return redirect()->back()->with('error', 'Gak boleh sembarangan hapus akun Bro!');
        }

        // Jangan biarkan admin hapus dirinya sendiri lewat menu ini (opsional tapi aman)
        if ($id === Auth::guard('admin')->user()->usere) {
            return redirect()->back()->with('error', 'Hapus akun sendiri? Jangan bercanda Bro! 😂');
        }

        try {
            // Jika ini adalah dokter yang datanya belum dibuatkan akun, hapus dokter dari database
            if (strpos($id, 'NEW_DOKTER_') === 0) {
                $kd_dokter = str_replace('NEW_DOKTER_', '', $id);
                $dokter = \App\Models\Dokter::where('kd_dokter', $kd_dokter)->first();
                if ($dokter) {
                    $dokter->delete();
                    return redirect()->back()->with('success', 'Data Dokter ganda/kosong berhasil dihapus dari sistem sepenuhnya.');
                }
            }

            $admin = Admin::find($id);
            if ($admin) {
                $admin->delete();
            } else {
                $pegawai = UserPegawai::find($id);
                if ($pegawai) $pegawai->delete();
            }

            return redirect()->back()->with('success', 'Akun telah berhasil dihapus dari sistem.');
        } catch (\Illuminate\Database\QueryException $e) {
            // Tangani error Foreign Key (Integritas Database)
            if ($e->getCode() == "23000") {
                return redirect()->back()->with('error', 'Gagal hapus! Data ini sudah digunakan/terikat di tabel lain (seperti Registrasi Periksa). Hapus dulu data pendaftarannya jika ingin benar-benar menghapus dokter ini.');
            }
            return redirect()->back()->with('error', 'Terjadi kesalahan database: ' . $e->getMessage());
        }
    }

    public function updateAccess(Request $request, $id)
    {
        $request->validate([
            'hak_akses' => 'required|array'
        ]);

        if (!Auth::guard('admin')->check()) {
            return redirect()->back()->with('error', 'Akses ditolak!');
        }

        // Simpan sebagai JSON String
        $rightsJson = json_encode($request->hak_akses);

        $admin = Admin::find($id);
        if ($admin) {
            $admin->hak_akses = $rightsJson;
            $admin->save();
        } else {
            $pegawai = UserPegawai::find($id);
            if ($pegawai) {
                $pegawai->hak_akses = $rightsJson;
                $pegawai->save();
            }
        }

        return redirect()->back()->with('success', 'Hak akses berhasil diperbarui!');
    }
}
