<?php

namespace App\Http\Controllers;

use App\Models\RegPeriksa;
use App\Models\PemeriksaanRalan;
use App\Models\AuditLog;
use App\Models\PemeriksaanRalanTemplate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class RekamMedisController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        $tgl_awal = $request->tgl_awal ?? date('Y-m-d');
        $tgl_akhir = $request->tgl_akhir ?? date('Y-m-d');

        $antrian = RegPeriksa::with(['pasien', 'dokter', 'poliklinik'])
            ->whereBetween('tgl_registrasi', [$tgl_awal, $tgl_akhir])
            ->where(function($q) use ($search) {
                if ($search) {
                    $q->whereHas('pasien', function($pq) use ($search) {
                        $pq->where('nm_pasien', 'like', "%$search%")
                          ->orWhere('no_rkm_medis', 'like', "%$search%");
                    });
                }
            })
            ->orderBy('tgl_registrasi', 'desc')
            ->orderBy('no_reg', 'asc')
            ->paginate(30)
            ->withQueryString();

        $antrian->getCollection()->transform(function ($reg) {
            if ($reg->pasien && $reg->pasien->tgl_lahir) {
                $birthDate = \Carbon\Carbon::parse($reg->pasien->tgl_lahir);
                $now = \Carbon\Carbon::now();
                $diff = $now->diff($birthDate);
                $reg->pasien->umur = "{$diff->y} Tahun, {$diff->m} Bulan, {$diff->d} Hari";
            } else {
                $reg->pasien->umur = '-';
            }
            return $reg;
        });

        return Inertia::render('RekamMedis/Index', [
            'antrian' => $antrian,
            'filters' => $request->only(['search', 'tgl_awal', 'tgl_akhir']),
            'tarif_pilihan' => \App\Models\TarifTindakan::orderBy('nama_tindakan', 'asc')->get()
        ]);
    }

    public function create($no_rawat)
    {
        $reg = RegPeriksa::with(['pasien', 'dokter', 'poliklinik'])->findOrFail($no_rawat);
        $riwayat = PemeriksaanRalan::whereHas('regPeriksa', function($q) use ($reg) {
            $q->where('no_rkm_medis', $reg->no_rkm_medis);
        })->orderBy('tgl_pemeriksaan', 'desc')->get();

        $templates = PemeriksaanRalanTemplate::where('nip', auth()->user()->username ?? '')
            ->orWhereNull('nip')
            ->orderBy('created_at', 'desc')
            ->get();

        if ($reg->pasien && $reg->pasien->tgl_lahir) {
            $birthDate = \Carbon\Carbon::parse($reg->pasien->tgl_lahir);
            $now = \Carbon\Carbon::now();
            $diff = $now->diff($birthDate);
            $reg->pasien->umur = "{$diff->y} Tahun, {$diff->m} Bulan, {$diff->d} Hari";
        }

        $tindakan_gabungan = DB::table('detail_tagihan_tindakan')
            ->join('tarif_tindakan', 'detail_tagihan_tindakan.id_tarif', '=', 'tarif_tindakan.id')
            ->where('detail_tagihan_tindakan.no_rawat', $no_rawat)
            ->select('tarif_tindakan.nama_tindakan', 'detail_tagihan_tindakan.id')
            ->get();

        $pemeriksaan_sekarang = PemeriksaanRalan::where('no_rawat', $no_rawat)->first();

        return Inertia::render('RekamMedis/Create', [
            'registrasi' => $reg,
            'riwayat' => $riwayat,
            'templates' => $templates,
            'tarif_pilihan' => \App\Models\TarifTindakan::orderBy('nama_tindakan', 'asc')->get(),
            'tindakan_gabungan' => $tindakan_gabungan,
            'pemeriksaan_sekarang' => $pemeriksaan_sekarang
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'no_rawat' => 'required|exists:reg_periksa,no_rawat',
            'keluhan' => 'required',
            'pemeriksaan' => 'required',
            'penilaian' => 'required',
            'tindak_lanjut' => 'required',
        ]);

        try {
            DB::beginTransaction();

            $pemeriksaan = PemeriksaanRalan::where('no_rawat', $request->no_rawat)->first();

            $data_pemeriksaan = [
                'no_rawat' => $request->no_rawat,
                'tgl_pemeriksaan' => date('Y-m-d'),
                'jam_pemeriksaan' => date('H:i:s'),
                'suhu_tubuh' => $request->suhu_tubuh,
                'tensi' => $request->tensi,
                'nadi' => $request->nadi,
                'respirasi' => $request->respirasi,
                'spo2' => $request->spo2,
                'tinggi' => $request->tinggi,
                'berat' => $request->berat,
                'lingkar_perut' => $request->lingkar_perut,
                'gcs' => $request->gcs,
                'kesadaran' => $request->kesadaran,
                'keluhan' => $request->keluhan,
                'pemeriksaan' => $request->pemeriksaan,
                'penilaian' => $request->penilaian,
                'tindak_lanjut' => $request->tindak_lanjut,
                'alergi' => $request->alergi,
                'nip' => auth()->user()->username ?? '', 
            ];

            if ($pemeriksaan) {
                $pemeriksaan->update($data_pemeriksaan);
            } else {
                PemeriksaanRalan::create($data_pemeriksaan);
            }

            if ($request->jadikan_template) {
                PemeriksaanRalanTemplate::create([
                    'nip' => auth()->user()->username ?? '',
                    'keluhan' => $request->keluhan,
                    'pemeriksaan' => $request->pemeriksaan,
                    'penilaian' => $request->penilaian,
                    'tindak_lanjut' => $request->tindak_lanjut,
                ]);
            }

            // Update status registrasi
            RegPeriksa::where('no_rawat', $request->no_rawat)->update(['stts' => 'Sudah']);

            AuditLog::record('SIMPAN_RME', 'Mengisi Rekam Medis No Rawat: ' . $request->no_rawat);

            DB::commit();
            return redirect()->route('rekam-medis.index')->with('message', 'Data pemeriksaan berhasil disimpan.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Gagal simpan RME: ' . $e->getMessage()]);
        }
    }

    public function update(Request $request)
    {
        $request->validate([
            'no_rawat' => 'required',
            'tgl_pemeriksaan' => 'required',
            'jam_pemeriksaan' => 'required',
        ]);

        try {
            DB::beginTransaction();

            PemeriksaanRalan::where('no_rawat', $request->no_rawat)
                ->where('tgl_pemeriksaan', $request->tgl_pemeriksaan)
                ->where('jam_pemeriksaan', $request->jam_pemeriksaan)
                ->update($request->except(['no_rawat', 'tgl_pemeriksaan', 'jam_pemeriksaan', 'jadikan_template', '_token', '_method']));

            if ($request->jadikan_template) {
                PemeriksaanRalanTemplate::create([
                    'nip' => auth()->user()->username ?? '',
                    'keluhan' => $request->keluhan,
                    'pemeriksaan' => $request->pemeriksaan,
                    'penilaian' => $request->penilaian,
                    'tindak_lanjut' => $request->tindak_lanjut,
                ]);
            }

            AuditLog::record('UPDATE_RME', 'Update Rekam Medis No Rawat: ' . $request->no_rawat);

            DB::commit();
            return back()->with('message', 'Data pemeriksaan berhasil diupdate.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Gagal update RME: ' . $e->getMessage()]);
        }
    }

    public function destroy(Request $request)
    {
        try {
            DB::beginTransaction();

            PemeriksaanRalan::where('no_rawat', $request->no_rawat)
                ->where('tgl_pemeriksaan', $request->tgl_pemeriksaan)
                ->where('jam_pemeriksaan', $request->jam_pemeriksaan)
                ->delete();

            AuditLog::record('HAPUS_RME', 'Hapus Rekam Medis No Rawat: ' . $request->no_rawat);

            DB::commit();
            return back()->with('message', 'Data pemeriksaan berhasil dihapus.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Gagal hapus RME: ' . $e->getMessage()]);
        }
    }

    public function destroyTemplate(Request $request, $id)
    {
        try {
            PemeriksaanRalanTemplate::findOrFail($id)->delete();
            return back()->with('message', 'Template berhasil dihapus.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal hapus template: ' . $e->getMessage()]);
        }
    }
}
