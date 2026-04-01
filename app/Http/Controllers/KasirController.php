<?php

namespace App\Http\Controllers;

use App\Models\TarifTindakan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class KasirController extends Controller
{
    public function tagihanIndex(Request $request)
    {
        $tgl_awal = $request->tgl_awal ?? date('Y-m-d');
        $tgl_akhir = $request->tgl_akhir ?? date('Y-m-d');

        // Ambil pasien yang sudah ada data pemeriksaan rawat jalan
        $pasien_diperiksa = DB::table('reg_periksa')
            ->join('pasien', 'reg_periksa.no_rkm_medis', '=', 'pasien.no_rkm_medis')
            ->join('pemeriksaan_ralan', 'reg_periksa.no_rawat', '=', 'pemeriksaan_ralan.no_rawat')
            ->join('dokter', 'reg_periksa.kd_dokter', '=', 'dokter.kd_dokter')
            ->whereBetween('pemeriksaan_ralan.tgl_pemeriksaan', [$tgl_awal, $tgl_akhir])
            ->select(
                'reg_periksa.no_rawat',
                'reg_periksa.no_reg',
                'reg_periksa.tgl_registrasi',
                'pasien.nm_pasien',
                'pasien.no_rkm_medis',
                'dokter.nm_dokter',
                'pemeriksaan_ralan.tgl_pemeriksaan'
            )
            ->orderBy('pemeriksaan_ralan.tgl_pemeriksaan', 'desc')
            ->get();

        return Inertia::render('Admin/TagihanPasien', [
            'pasien_diperiksa' => $pasien_diperiksa,
            'tarif_pilihan' => TarifTindakan::all(),
            'tgl_awal' => $tgl_awal,
            'tgl_akhir' => $tgl_akhir
        ]);
    }

    public function getTagihanData($no_rawat)
    {
        // 1. Ambil Resep Obat Reguler (Non-Racik) & Harganya
        $obat_reguler = DB::table('resep_obat')
            ->join('resep_dokter', 'resep_obat.no_resep', '=', 'resep_dokter.no_resep')
            ->join('databarang', 'resep_dokter.kode_brng', '=', 'databarang.kode_brng')
            ->where('resep_obat.no_rawat', $no_rawat)
            ->select(
                'databarang.kode_brng',
                'databarang.nama_brng',
                'resep_dokter.jml',
                'databarang.hargajual as harga_satuan',
                DB::raw('(resep_dokter.jml * databarang.hargajual) as subtotal')
            )
            ->get();

        // 2. Ambil Resep Racikan
        $obat_racikan = DB::table('resep_obat')
            ->join('resep_dokter_racikan', 'resep_obat.no_resep', '=', 'resep_dokter_racikan.no_resep')
            ->join('resep_dokter_racikan_detail', function($join) {
                $join->on('resep_dokter_racikan.no_resep', '=', 'resep_dokter_racikan_detail.no_resep')
                     ->on('resep_dokter_racikan.nama_racik', '=', 'resep_dokter_racikan_detail.nama_racik');
            })
            ->join('databarang', 'resep_dokter_racikan_detail.kode_brng', '=', 'databarang.kode_brng')
            ->where('resep_obat.no_rawat', $no_rawat)
            ->select(
                'databarang.kode_brng',
                DB::raw("CONCAT('[Racik] ', resep_dokter_racikan.nama_racik, ' - ', databarang.nama_brng) as nama_brng"),
                DB::raw("(resep_dokter_racikan_detail.jml * resep_dokter_racikan.jml_dr) as jml"),
                'databarang.hargajual as harga_satuan',
                DB::raw("((resep_dokter_racikan_detail.jml * resep_dokter_racikan.jml_dr) * databarang.hargajual) as subtotal")
            )
            ->get();

        $obat = $obat_reguler->concat($obat_racikan);

        // 2. Ambil Tindakan yang sudah ditambahkan (Jika ada tabel detail_tagihan_tindakan)
        $tindakan = DB::table('detail_tagihan_tindakan')
            ->join('tarif_tindakan', 'detail_tagihan_tindakan.id_tarif', '=', 'tarif_tindakan.id')
            ->where('detail_tagihan_tindakan.no_rawat', $no_rawat)
            ->select(
                'detail_tagihan_tindakan.id',
                'tarif_tindakan.nama_tindakan',
                'detail_tagihan_tindakan.biaya as harga_satuan',
                'detail_tagihan_tindakan.qty',
                DB::raw('(detail_tagihan_tindakan.biaya * detail_tagihan_tindakan.qty) as subtotal')
            )
            ->get();

        // 3. Ambil Registrasi untuk cek status_closing
        $registrasi = DB::table('reg_periksa')
            ->where('no_rawat', $no_rawat)
            ->first();

        return response()->json([
            'obat' => $obat,
            'tindakan' => $tindakan,
            'status_closing' => $registrasi->status_closing ?? 'Belum'
        ]);
    }

    public function storeTindakan(Request $request)
    {
        $request->validate([
            'no_rawat' => 'required|string',
            'id_tarif' => 'required|array',
            'id_tarif.*' => 'exists:tarif_tindakan,id',
            'qty' => 'required|numeric|min:1',
        ]);

        $registrasi = DB::table('reg_periksa')->where('no_rawat', $request->no_rawat)->first();
        if ($registrasi && ($registrasi->status_closing ?? 'Belum') == 'Selesai') {
            if ($request->expectsJson() || $request->ajax()) {
                return response()->json(['success' => false, 'message' => 'Gagal: Pasien sudah Klosing (Terkunci).'], 403);
            }
            return redirect()->back()->with('error', 'Gagal: Pasien sudah Klosing.');
        }

        try {
            DB::beginTransaction();

            foreach ($request->id_tarif as $id) {
                $tarif = TarifTindakan::findOrFail($id);

                DB::table('detail_tagihan_tindakan')->insert([
                    'no_rawat' => $request->no_rawat,
                    'id_tarif' => $id,
                    'biaya' => $tarif->tarif,
                    'qty' => $request->qty,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            DB::commit();

            if ($request->expectsJson() || $request->ajax()) {
                return response()->json(['success' => true, 'message' => 'Tindakan berhasil ditambahkan ke tagihan! 🎉']);
            }

            return redirect()->back()->with('success', 'Tindakan berhasil ditambahkan ke tagihan! 🎉');

        } catch (\Exception $e) {
            DB::rollBack();
            if ($request->expectsJson() || $request->ajax()) {
                return response()->json(['success' => false, 'message' => 'Gagal menambahkan tindakan: ' . $e->getMessage()], 400);
            }

            return redirect()->back()->with('error', 'Gagal menambahkan tindakan: ' . $e->getMessage());
        }
    }

    public function destroyTindakan($id)
    {
        DB::table('detail_tagihan_tindakan')->where('id', $id)->delete();
        return redirect()->back()->with('success', 'Tindakan berhasil dihapus dari tagihan!');
    }

    public function toggleClosing(Request $request)
    {
        $request->validate([
            'no_rawat' => 'required|string',
        ]);

        $registrasi = DB::table('reg_periksa')
            ->where('no_rawat', $request->no_rawat)
            ->first();

        if (!$registrasi) {
            return response()->json(['success' => false, 'message' => 'Data tidak ditemukan!'], 404);
        }

        $new_status = (($registrasi->status_closing ?? 'Belum') == 'Selesai') ? 'Belum' : 'Selesai';

        DB::table('reg_periksa')
            ->where('no_rawat', $request->no_rawat)
            ->update([
                'status_closing' => $new_status,
                'updated_at' => now()
            ]);

        return response()->json([
            'success' => true,
            'message' => 'Status Berhasil diperbarui menjadi ' . $new_status,
            'status_closing' => $new_status
        ]);
    }
}
