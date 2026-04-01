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
        // Hanya Admin yang bisa akses daftar akun
        if (!Auth::guard('admin')->check()) {
            return redirect('/dashboard')->with('error', 'Akses ditolak Bro!');
        }

        $admins = Admin::all()->map(function($a) {
            return [
                'id' => $a->usere,
                'nama' => $a->nama,
                'username' => SIKCrypt::decrypt($a->usere),
                'role' => 'admin',
                'jabatan' => 'Super Admin',
                'status' => 'Aktif',
                'hak_akses' => $a->hak_akses // Ambil data izin
            ];
        });

        // Ambil semua id_user yang sudah terdaftar di user_pegawai
        $pegawais = UserPegawai::all();
        $registeredIds = $pegawais->map(function($p) {
            return SIKCrypt::decrypt($p->id_user);
        })->toArray();

        $pegawaiList = $pegawais->map(function($p) {
            return [
                'id' => $p->id_user,
                'nama' => $p->nama,
                'username' => SIKCrypt::decrypt($p->id_user),
                'role' => 'pegawai',
                'jabatan' => $p->jabatan ?? 'Pegawai Klinik',
                'status' => 'Aktif',
                'hak_akses' => $p->hak_akses // Ambil data izin
            ];
        });

        // Ambil Dokter yang belum punya akun di user_pegawai
        $dokters = \App\Models\Dokter::all();
        $dokterList = $dokters->filter(function($d) use ($registeredIds) {
            return !in_array($d->kd_dokter, $registeredIds);
        })->map(function($d) {
            return [
                'id' => 'NEW_DOKTER_' . $d->kd_dokter, // ID Semu untuk trigger aktivasi
                'nama' => $d->nm_dokter,
                'username' => $d->kd_dokter,
                'role' => 'pegawai',
                'jabatan' => 'Dokter',
                'status' => 'Belum Aktif'
            ];
        });

        return Inertia::render('Admin/AccountSetting', [
            'accounts' => $admins->concat($pegawaiList)->concat($dokterList)
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'role' => 'required',
            'new_username' => 'required|min:4',
            'new_password' => ($request->id && strpos($request->id, 'NEW_DOKTER_') === 0) ? 'required|min:4' : 'nullable|min:4',
        ]);

        if (!Auth::guard('admin')->check()) {
            return redirect()->back()->withErrors(['error' => 'Hanya Super Admin yang bisa mengelola akun!']);
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

            UserPegawai::create([
                'id_user' => $newUsernameEnc,
                'password' => SIKCrypt::encrypt($request->new_password),
                'nama_pegawai' => $dokter->nm_dokter,
                'nik' => $dokter->kd_dokter, // Tambahkan ini biar gak error NIK kosong
                'jabatan' => 'Dokter',
                'stts_nikah' => $dokter->stts_nikah,
                'alamat' => $dokter->alamat,
                'no_telp' => $dokter->no_telp,
            ]);

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

        $admin = Admin::find($id);
        if ($admin) {
            $admin->delete();
        } else {
            $pegawai = UserPegawai::find($id);
            if ($pegawai) $pegawai->delete();
        }

        return redirect()->back()->with('success', 'Akun telah berhasil dihapus dari sistem.');
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
