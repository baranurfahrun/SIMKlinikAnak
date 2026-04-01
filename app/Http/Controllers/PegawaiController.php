<?php

namespace App\Http\Controllers;

use App\Models\Dokter;
use App\Models\UserPegawai;
use App\Helpers\SIKCrypt;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PegawaiController extends Controller
{
    public function index()
    {
        $dokter = Dokter::orderBy('nm_dokter', 'asc')->get();
        $pegawai = UserPegawai::all();

        return Inertia::render('Admin/Kepegawaian', [
            'dokter' => $dokter,
            'pegawai' => $pegawai
        ]);
    }

    public function storeDokter(Request $request)
    {
        $request->validate([
            'kd_dokter' => 'required|unique:dokter,kd_dokter',
            'nm_dokter' => 'required',
        ]);

        $data = $request->all();
        if (empty($data['tgl_lahir'])) {
            $data['tgl_lahir'] = null;
        }

        Dokter::create($data);

        return redirect()->back()->with('success', 'Data Dokter berhasil disimpan');
    }

    public function storeStaf(Request $request)
    {
        $request->validate([
            'nik' => 'required',
            'nama_pegawai' => 'required',
        ]);

        // Jika id_user gak diisi, otomatis pake NIK (Sesuai request user biar masuk ke pengaturan akun nanti)
        $username = $request->id_user ?: $request->nik;
        $id_enc = SIKCrypt::encrypt($username);
        
        // Cek manual unik karena PK terenkripsi
        if (UserPegawai::where('id_user', $id_enc)->exists()) {
            return redirect()->back()->withErrors(['nik' => 'NIK atau Username ini sudah terdaftar Bro!']);
        }

        $data = $request->all();
        $data['id_user'] = $id_enc;
        $data['password'] = SIKCrypt::encrypt($request->password ?: $username); // Default password pke username/NIK
        
        if (empty($data['tgl_lahir'])) {
            $data['tgl_lahir'] = null;
        }

        UserPegawai::create($data);

        return redirect()->back()->with('success', 'Data Staf berhasil disimpan');
    }

    public function updateDokter(Request $request, $kd_dokter)
    {
        $dokter = Dokter::findOrFail($kd_dokter);
        $data = $request->all();
        if (empty($data['tgl_lahir'])) {
            $data['tgl_lahir'] = null;
        }
        $dokter->update($data);

        return redirect()->back()->with('success', 'Data Dokter berhasil diperbarui');
    }

    public function destroyDokter($kd_dokter)
    {
        try {
            Dokter::findOrFail($kd_dokter)->delete();
            return redirect()->back()->with('success', 'Data Dokter berhasil dihapus');
        } catch (\Illuminate\Database\QueryException $e) {
            return redirect()->back()->withErrors(['gagal' => 'Gagal menghapus: Dokter ini sudah memiliki riwayat pemeriksaan/registrasi di sistem.']);
        }
    }

    public function updateStaf(Request $request, $id_user)
    {
        $staf = UserPegawai::findOrFail($id_user);
        $data = $request->all();
        
        if ($request->filled('password')) {
            $data['password'] = SIKCrypt::encrypt($request->password);
        } else {
            unset($data['password']);
        }

        if (empty($data['tgl_lahir'])) {
            $data['tgl_lahir'] = null;
        }
        
        $staf->update($data);

        return redirect()->back()->with('success', 'Data Staf berhasil diperbarui');
    }

    public function destroyStaf($id_user)
    {
        try {
            UserPegawai::findOrFail($id_user)->delete();
            return redirect()->back()->with('success', 'Data Staf berhasil dihapus');
        } catch (\Illuminate\Database\QueryException $e) {
            return redirect()->back()->withErrors(['gagal' => 'Gagal menghapus: Staf ini masih bertaut dengan histori data transaksi di sistem.']);
        }
    }

    public function getDokterList()
    {
        return response()->json(Dokter::orderBy('nm_dokter', 'asc')->get());
    }
}
