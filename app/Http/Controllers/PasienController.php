<?php

namespace App\Http\Controllers;

use App\Models\Pasien;
use App\Models\AuditLog;
use App\Helpers\SIKCrypt;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class PasienController extends Controller
{
    public function index(Request $request)
    {
        $query = Pasien::orderBy('tgl_daftar', 'desc');

        if ($request->has('search') && $request->search != '') {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('nm_pasien', 'like', "%{$search}%")
                  ->orWhere('no_rkm_medis', 'like', "%{$search}%")
                  ->orWhere('nm_ibu', 'like', "%{$search}%")
                  ->orWhere('no_tlp', 'like', "%{$search}%");
            });
        }

        $pasiens = $query->paginate(10)->withQueryString();
        
        // Dekripsi NIK untuk tampilan (opsional, tergantung kebijakan audit)
        $pasiens->getCollection()->transform(function ($pasien) {
            $pasien->nik_dec = SIKCrypt::decrypt($pasien->nik);
            return $pasien;
        });

        return Inertia::render('Pasien/Index', [
            'pasiens' => $pasiens,
            'filters' => $request->only('search')
        ]);
    }

    public function create()
    {
        // Generate No RM Otomatis (Contoh: 000001)
        $lastPasien = Pasien::orderBy('no_rkm_medis', 'desc')->first();
        $nextNo = $lastPasien ? (intval($lastPasien->no_rkm_medis) + 1) : 1;
        $no_rkm_medis = str_pad($nextNo, 6, '0', STR_PAD_LEFT);

        return Inertia::render('Pasien/Create', [
            'nextNoRM' => $no_rkm_medis
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'no_rkm_medis' => 'required|unique:pasien,no_rkm_medis',
            'nm_pasien' => 'required|string|max:100',
            'nik' => 'required|string|max:20',
            'jk' => 'required|in:L,P',
            'tgl_lahir' => 'required|date',
            'nm_ibu' => 'required|string|max:100',
            'no_tlp' => 'required|string|max:20',
            'alamat' => 'required|string',
        ]);

        try {
            DB::beginTransaction();

            $data = $request->all();
            $data['nik'] = SIKCrypt::encrypt($request->nik);
            $data['tgl_daftar'] = now();

            Pasien::create($data);

            AuditLog::record('REGISTER_PASIEN', 'Mendaftarkan pasien baru No. RM: ' . $request->no_rkm_medis);

            DB::commit();

            return redirect()->route('pasien.index')->with('message', 'Pasien berhasil didaftarkan.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Gagal mendaftarkan pasien: ' . $e->getMessage()]);
        }
    }

    public function registerToPoli($no_rkm_medis)
    {
        $pasien = Pasien::findOrFail($no_rkm_medis);
        $tgl_sekarang = date('Y-m-d');
        $jam_sekarang = date('H:i:s');

        try {
            DB::beginTransaction();

            // 1. Generate No Registrasi (Antrian hari ini di Poli Anak)
            $count = \App\Models\RegPeriksa::where('tgl_registrasi', $tgl_sekarang)
                        ->where('kd_poli', 'PA')
                        ->count();
            $no_reg = str_pad($count + 1, 3, '0', STR_PAD_LEFT);

            // 2. Generate No Rawat (Format: YYYY/MM/DD/0001)
            $no_rawat = date('Y/m/d/') . str_pad($count + 1, 4, '0', STR_PAD_LEFT);

            \App\Models\RegPeriksa::create([
                'no_reg' => $no_reg,
                'no_rawat' => $no_rawat,
                'tgl_registrasi' => $tgl_sekarang,
                'jam_reg' => $jam_sekarang,
                'kd_dokter' => 'D001', // Dr. Siska default
                'no_rkm_medis' => $pasien->no_rkm_medis,
                'kd_poli' => 'PA', // Poli Anak default
                'stts' => 'Belum',
                'status_lanjut' => 'Ralan',
            ]);

            AuditLog::record('REG_POLI', 'Mendaftarkan pasien ke Poli Anak. No Rawat: ' . $no_rawat);

            DB::commit();

            return redirect()->route('pasien.index')->with('message', 'Pasien berhasil didaftarkan ke Poli Anak. No. Antrian: ' . $no_reg);
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Gagal mendaftarkan ke poli: ' . $e->getMessage()]);
        }
    }

    public function edit($no_rkm_medis)
    {
        $pasien = Pasien::findOrFail($no_rkm_medis);
        $pasien->nik = SIKCrypt::decrypt($pasien->nik);

        return Inertia::render('Pasien/Edit', [
            'pasien' => $pasien
        ]);
    }

    public function update(Request $request, $no_rkm_medis)
    {
        $request->validate([
            'nm_pasien' => 'required|string|max:100',
            'nik' => 'required|string|max:20',
            'jk' => 'required|in:L,P',
            'tgl_lahir' => 'required|date',
            'nm_ibu' => 'required|string|max:100',
            'no_tlp' => 'required|string|max:20',
            'alamat' => 'required|string',
        ]);

        try {
            DB::beginTransaction();

            $pasien = Pasien::findOrFail($no_rkm_medis);
            $data = $request->all();
            $data['nik'] = SIKCrypt::encrypt($request->nik);

            $pasien->update($data);

            AuditLog::record('UPDATE_PASIEN', 'Mengubah data pasien No. RM: ' . $no_rkm_medis);

            DB::commit();

            return redirect()->route('pasien.index')->with('message', 'Data pasien berhasil diperbarui.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Gagal memperbarui data pasien: ' . $e->getMessage()]);
        }
    }

    public function destroy($no_rkm_medis)
    {
        try {
            DB::beginTransaction();

            $pasien = Pasien::findOrFail($no_rkm_medis);
            
            // Check if patient has medical records
            $hasRecords = \App\Models\RegPeriksa::where('no_rkm_medis', $no_rkm_medis)->exists();
            if ($hasRecords) {
                return back()->withErrors(['error' => 'Pasien tidak bisa dihapus karena sudah memiliki riwayat kunjungan/pemeriksaan.']);
            }

            $pasien->delete();

            AuditLog::record('HAPUS_PASIEN', 'Menghapus data pasien No. RM: ' . $no_rkm_medis);

            DB::commit();

            return redirect()->route('pasien.index')->with('message', 'Data pasien berhasil dihapus.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Gagal menghapus pasien: ' . $e->getMessage()]);
        }
    }
}
