<?php

namespace App\Http\Controllers;

use App\Models\RegPeriksa;
use App\Models\PemeriksaanRalan;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class RegPeriksaController extends Controller
{
    public function index(Request $request)
    {
        $tgl_awal = $request->tgl_awal ?? date('Y-m-d');
        $tgl_akhir = $request->tgl_akhir ?? date('Y-m-d');
        
        $registrasi = RegPeriksa::with(['pasien', 'dokter', 'poliklinik'])
            ->whereBetween('tgl_registrasi', [$tgl_awal, $tgl_akhir])
            ->orderBy('tgl_registrasi', 'desc')
            ->orderBy('no_reg', 'asc')
            ->paginate(30)
            ->withQueryString();

        $allPatients = \App\Models\Pasien::orderBy('nm_pasien', 'asc')->get();
        $allPatients->transform(function($p) {
            $p->nik_dec = \App\Helpers\SIKCrypt::decrypt($p->nik);
            return $p;
        });

        return Inertia::render('Registrasi/Index', [
            'registrasi' => $registrasi,
            'poliklinik' => \App\Models\Poliklinik::all(),
            'dokter' => \App\Models\Dokter::all(),
            'allPatients' => $allPatients,
        ]);
    }

    public function searchPasien(Request $request)
    {
        $search = $request->term;
        $pasien = \App\Models\Pasien::where('no_rkm_medis', 'like', "%$search%")
            ->orWhere('nm_pasien', 'like', "%$search%")
            ->limit(5)
            ->get();
            
        $pasien->transform(function($p) {
            $p->nik_dec = \App\Helpers\SIKCrypt::decrypt($p->nik);
            return $p;
        });

        return response()->json($pasien);
    }

    public function store(Request $request)
    {
        $request->validate([
            'no_rkm_medis' => 'required|exists:pasien,no_rkm_medis',
            'kd_dokter' => 'required',
            'kd_poli' => 'required',
            'p_jawab' => 'required',
            'hubunganpj' => 'required',
            'kd_pj' => 'required',
        ]);

        $tgl_sekarang = date('Y-m-d');
        $jam_sekarang = date('H:i:s');

        try {
            $lockKey = 'reg_periksa_lock_' . $request->no_rkm_medis;
            $lock = \Illuminate\Support\Facades\Cache::lock($lockKey, 5);

            if (!$lock->get()) {
                return back()->withErrors(['error' => 'Sistem sedang memproses pendaftaran untuk pasien ini. Mohon tunggu beberapa detik.']);
            }

            DB::beginTransaction();

            $max_no_reg = RegPeriksa::where('tgl_registrasi', $tgl_sekarang)
                        ->where('kd_dokter', $request->kd_dokter)
                        ->max('no_reg');
            $no_reg = $max_no_reg ? str_pad(((int) $max_no_reg) + 1, 3, '0', STR_PAD_LEFT) : '001';

            $max_no_rawat = RegPeriksa::where('tgl_registrasi', $tgl_sekarang)->max('no_rawat');
            if ($max_no_rawat) {
                // Ambil urutan di belakang 'YYYY/MM/DD/' dan pertahankan format padding aslinya.
                $last_urutan_rawat = (int) substr($max_no_rawat, 11);
                $panjang_digit = max(strlen($max_no_rawat) - 11, 4);
                $no_rawat = date('Y/m/d/') . str_pad($last_urutan_rawat + 1, $panjang_digit, '0', STR_PAD_LEFT);
            } else {
                $no_rawat = date('Y/m/d/') . '0001';
            }

            RegPeriksa::create([
                'no_reg' => $no_reg,
                'no_rawat' => $no_rawat,
                'tgl_registrasi' => $tgl_sekarang,
                'jam_reg' => $jam_sekarang,
                'kd_dokter' => $request->kd_dokter,
                'no_rkm_medis' => $request->no_rkm_medis,
                'kd_poli' => $request->kd_poli,
                'stts' => 'Belum',
                'status_lanjut' => 'Ralan',
                'p_jawab' => $request->p_jawab,
                'hubunganpj' => $request->hubunganpj,
                'almt_pj' => $request->almt_pj,
                'kd_pj' => $request->kd_pj,
                'asal_rujukan' => $request->asal_rujukan,
                'no_ktp' => $request->no_ktp,
            ]);

            // Save TTV Data if provided
            if ($request->filled('suhu_tubuh') || $request->filled('berat') || $request->filled('tensi')) {
                PemeriksaanRalan::create([
                    'no_rawat' => $no_rawat,
                    'tgl_pemeriksaan' => $tgl_sekarang,
                    'jam_pemeriksaan' => $jam_sekarang,
                    'suhu_tubuh' => $request->suhu_tubuh,
                    'tensi' => $request->tensi,
                    'nadi' => $request->nadi,
                    'respirasi' => $request->respirasi,
                    'spo2' => $request->spo2,
                    'tinggi' => $request->tinggi,
                    'berat' => $request->berat,
                    'lingkar_perut' => $request->lingkar_perut,
                    'gcs' => $request->gcs,
                    'kesadaran' => $request->kesadaran ?? 'Compos Mentis',
                    'keluhan' => '-',
                    'pemeriksaan' => '-',
                    'penilaian' => '-',
                    'tindak_lanjut' => '-',
                    'alergi' => '-',
                    'nip' => auth()->user()->username ?? '',
                ]);
            }

            AuditLog::record('REG_POLI', 'Registrasi Baru Detail: ' . $no_rawat);

            DB::commit();
            if (isset($lock)) { $lock->release(); }
            return back()->with('message', 'Registrasi berhasil disimpan.');
        } catch (\Exception $e) {
            DB::rollBack();
            if (isset($lock)) { $lock->release(); }
            return back()->withErrors(['error' => 'Gagal registrasi: ' . $e->getMessage()]);
        }
    }

    public function destroy($no_rawat)
    {
        try {
            DB::beginTransaction();
            
            $reg = RegPeriksa::findOrFail($no_rawat);
            $no_rm = $reg->no_rkm_medis;
            
            $reg->delete();

            AuditLog::record('CANCEL_REG_POLI', 'Membatalkan registrasi No Rawat: ' . $no_rawat . ' untuk Pasien: ' . $no_rm);

            DB::commit();
            return back()->with('message', 'Registrasi berhasil dibatalkan.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Gagal membatalkan registrasi: ' . $e->getMessage()]);
        }
    }
}
