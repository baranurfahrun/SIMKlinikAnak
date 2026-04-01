<?php

namespace App\Http\Controllers;

use App\Models\RegPeriksa;
use App\Models\DataBarang;
use App\Models\ResepObat;
use App\Models\ResepDokter;
use App\Models\StokObat;
use App\Models\StokOpname;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FarmasiController extends Controller
{
    public function create($no_rawat)
    {
        $reg = RegPeriksa::with(['pasien', 'dokter', 'poliklinik'])->findOrFail($no_rawat);
        $obat = DataBarang::where('status', '1')
            ->orderBy('nama_brng', 'asc')
            ->limit(10)
            ->get()
            ->map(function($item) {
                // Ambil saldo terakhir dari AUDIT OPNAME (Sesuai Logika Bro)
                $last = DB::table('stok_opname')
                    ->where('kode_brng', $item->kode_brng)
                    ->orderBy('created_at', 'desc')
                    ->first();
                
                $item->stok = $last ? $last->stok_sistem : 0;
                return $item;
            })
            // Filter hanya yang ada stoknya biar Dokter gak order obat kosong
            ->filter(function($item) {
                return $item->stok > 0;
            })->values();

        $riwayatResep = ResepObat::with('detail.barang')
            ->where('no_rawat', $no_rawat)
            ->orderBy('tgl_perawatan', 'desc')
            ->get();
        
        return Inertia::render('Farmasi/Create', [
            'registrasi' => $reg,
            'obat' => $obat,
            'riwayatResep' => $riwayatResep
        ]);
    }

    public function searchObat(Request $request)
    {
        return DataBarang::where('status', '1')
            ->where('nama_brng', 'like', '%' . $request->search . '%')
            ->limit(20)
            ->get()
            ->map(function($item) {
                // Ambil saldo terakhir dari AUDIT OPNAME
                $last = DB::table('stok_opname')
                    ->where('kode_brng', $item->kode_brng)
                    ->orderBy('created_at', 'desc')
                    ->first();
                
                $item->stok = $last ? $last->stok_sistem : 0;
                return $item;
            })
            ->filter(function($item) {
                return $item->stok > 0;
            })->values();
    }

    public function store(Request $request)
    {
        \Log::info('Incoming Resep Request:', $request->all());
        $request->validate([
            'no_rawat' => 'required',
            'kd_dokter' => 'required',
            'items' => 'nullable|array',
            'racikan' => 'nullable|array'
        ]);

        $registrasi = DB::table('reg_periksa')->where('no_rawat', $request->no_rawat)->first();
        if ($registrasi && ($registrasi->status_closing ?? 'Belum') == 'Selesai') {
            if ($request->expectsJson() || $request->ajax()) {
                return response()->json(['status' => 'error', 'message' => 'Gagal: Rincian Resep Terkunci karena sudah Klosing.'], 403);
            }
            return redirect()->back()->with('error', 'Gagal: Rincian Resep Terkunci karena sudah Klosing.');
        }

        if (empty($request->items) && empty($request->racikan)) {
            return redirect()->back()->with('error', 'Gagal: Pilih minimal satu resep non-racik atau racikan!');
        }

        try {
            DB::beginTransaction();

            $no_resep = date('YmdHis'); 

            // Lookup Dokter dari user login (Jika Login sebagai Dokter)
            $kd_dokter = $request->kd_dokter;
            if (auth('pegawai')->check()) {
                $user = auth('pegawai')->user();
                if (strtolower($user->jabatan) === 'dokter') {
                    $kd_dokter = $user->nik; // Pada Aktivasi Akun Dokter, NIK diisi dengan kd_dokter
                }
            }
            
            ResepObat::create([
                'no_resep' => $no_resep,
                'tgl_perawatan' => date('Y-m-d'),
                'jam_perawatan' => date('H:i:s'),
                'no_rawat' => $request->no_rawat,
                'kd_dokter' => $kd_dokter,
                'tgl_penyerahan' => null,
                'jam_penyerahan' => null
            ]);

            // 1. Simpan Obat Reguler (Non-Racik)
            if ($request->has('items') && is_array($request->items)) {
                foreach ($request->items as $item) {
                    $stok = DB::table('stok_obat')->where('kode_brng', $item['kode_brng'])->first();
                    $nama_brng = DB::table('databarang')->where('kode_brng', $item['kode_brng'])->value('nama_brng');

                    if (!$stok || $stok->stok < (double)$item['jml']) {
                        $stok_ada = $stok ? $stok->stok : 0;
                        throw new \Exception("Stok fisik '{$nama_brng}' sisa {$stok_ada}, tapi Anda meminta {$item['jml']}!");
                    }

                    ResepDokter::create([
                        'no_resep' => $no_resep,
                        'kode_brng' => $item['kode_brng'],
                        'jml' => (double)$item['jml'],
                        'aturan_pakai' => $item['aturan_pakai']
                    ]);

                    DB::table('stok_obat')
                        ->where('kode_brng', $item['kode_brng'])
                        ->decrement('stok', (double)$item['jml']);

                    $stok_sekarang = DB::table('stok_obat')->where('kode_brng', $item['kode_brng'])->value('stok');
                    DB::table('stok_opname')->insert([
                        'no_opname' => 'RX' . date('YmdHis') . rand(10, 99),
                        'tgl_opname' => date('Y-m-d'),
                        'kode_brng' => $item['kode_brng'],
                        'stok_sistem' => $stok_sekarang,
                        'stok_fisik' => $stok_sekarang,
                        'selisih' => -(double)$item['jml'],
                        'keterangan' => 'Resep Elektronik: ' . $request->no_rawat,
                        'created_at' => now(),
                        'updated_at' => now()
                    ]);
                }
            }

            // 2. Simpan Racikan
            if ($request->has('racikan') && is_array($request->racikan)) {
                foreach ($request->racikan as $group) {
                    DB::table('resep_dokter_racikan')->insert([
                        'no_resep' => $no_resep,
                        'nama_racik' => $group['nama_racikan'],
                        'metode_racik' => $group['metode_racik'] ?? 'Kapsul',
                        'aturan_pakai' => $group['aturan_pakai'] ?? '3 x 1',
                        'jml_dr' => (double)($group['jml_racik'] ?? 10),
                        'created_at' => now(),
                        'updated_at' => now()
                    ]);

                    foreach ($group['items'] as $bahan) {
                        $stok = DB::table('stok_obat')->where('kode_brng', $bahan['kode_brng'])->first();
                        $nama_brng = DB::table('databarang')->where('kode_brng', $bahan['kode_brng'])->value('nama_brng');
                        
                        $total_butuh = (double)$bahan['jml'] * (double)($group['jml_racik'] ?? 10);
                        $dosis_input = (double)$bahan['jml'];
                        $kapsul_jml  = (double)($group['jml_racik'] ?? 10);

                        if (!$stok || $stok->stok < $total_butuh) {
                            $stok_ada = $stok ? $stok->stok : 0;
                            throw new \Exception("Stok '{$nama_brng}' tidak mencukupi! Anda butuh {$total_butuh} sisa stok hanya {$stok_ada}. (Hitungan: Dosis {$dosis_input} x {$kapsul_jml} Kapsul/Bungkus)");
                        }

                        DB::table('resep_dokter_racikan_detail')->insert([
                            'no_resep' => $no_resep,
                            'nama_racik' => $group['nama_racikan'],
                            'kode_brng' => $bahan['kode_brng'],
                            'jml' => (double)$bahan['jml'], // Dosis per bungkus
                            'created_at' => now(),
                            'updated_at' => now()
                        ]);

                        DB::table('stok_obat')->where('kode_brng', $bahan['kode_brng'])->decrement('stok', $total_butuh);
                        
                        $stok_sekarang = DB::table('stok_obat')->where('kode_brng', $bahan['kode_brng'])->value('stok');
                        DB::table('stok_opname')->insert([
                            'no_opname' => 'RX' . date('YmdHis') . rand(10, 99),
                            'tgl_opname' => date('Y-m-d'),
                            'kode_brng' => $bahan['kode_brng'],
                            'stok_sistem' => $stok_sekarang,
                            'stok_fisik' => $stok_sekarang,
                            'selisih' => -$total_butuh,
                            'keterangan' => 'Resep Racikan: ' . $group['nama_racikan'],
                            'created_at' => now(),
                            'updated_at' => now()
                        ]);
                    }
                }
            }

            DB::commit();
            \Log::info('Resep Saved Successfully:', ['no_resep' => $no_resep]);

            if ($request->expectsJson() || $request->ajax()) {
                return response()->json(['success' => true, 'message' => 'Resep berhasil terkirim ke Farmasi.']);
            }

            return redirect()->back()->with('success', 'Resep berhasil terkirim ke Farmasi.');

        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Gagal simpan resep: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
            if ($request->expectsJson() || $request->ajax()) {
                return response()->json(['success' => false, 'message' => 'Gagal menyimpan resep: ' . $e->getMessage()], 400);
            }

            return redirect()->back()->with('error', 'Gagal menyimpan resep: ' . $e->getMessage());
        }
    }

    public function indexResepMasuk(Request $request) {
        $tgl_awal = $request->tgl_awal ?? date('Y-m-d');
        $tgl_akhir = $request->tgl_akhir ?? date('Y-m-d');

        $resep = ResepObat::with(['registrasi.pasien', 'dokter', 'detail.barang'])
            ->whereNull('tgl_penyerahan')
            ->whereBetween('tgl_perawatan', [$tgl_awal, $tgl_akhir])
            ->orderBy('tgl_perawatan', 'desc')
            ->orderBy('jam_perawatan', 'desc')
            ->get()
            ->map(function($r) {
                $r->racikan = DB::table('resep_dokter_racikan')->where('no_resep', $r->no_resep)->get()->map(function($racik) use ($r) {
                    $racik->items = DB::table('resep_dokter_racikan_detail')
                        ->join('databarang', 'resep_dokter_racikan_detail.kode_brng', '=', 'databarang.kode_brng')
                        ->where('resep_dokter_racikan_detail.no_resep', $r->no_resep)
                        ->where('resep_dokter_racikan_detail.nama_racik', $racik->nama_racik)
                        ->select('resep_dokter_racikan_detail.*', 'databarang.nama_brng')
                        ->get();
                    return $racik;
                });
                return $r;
            });

        $groupedResep = $this->groupResep($resep);
            
        return Inertia::render('Farmasi/ResepMasuk', [
            'resep' => $groupedResep,
            'title' => 'Daftar Resep Masuk',
            'type' => 'masuk',
            'filters' => [
                'tgl_awal' => $tgl_awal,
                'tgl_akhir' => $tgl_akhir
            ]
        ]);
    }

    public function indexResepKeluar(Request $request) {
        $tgl_awal = $request->tgl_awal ?? date('Y-m-d');
        $tgl_akhir = $request->tgl_akhir ?? date('Y-m-d');

        $resep = ResepObat::with(['registrasi.pasien', 'dokter', 'detail.barang'])
            ->whereNotNull('tgl_penyerahan')
            ->whereBetween('tgl_penyerahan', [$tgl_awal, $tgl_akhir])
            ->orderBy('tgl_penyerahan', 'desc')
            ->orderBy('jam_penyerahan', 'desc')
            ->get()
            ->map(function($r) {
                $r->racikan = DB::table('resep_dokter_racikan')->where('no_resep', $r->no_resep)->get()->map(function($racik) use ($r) {
                    $racik->items = DB::table('resep_dokter_racikan_detail')
                        ->join('databarang', 'resep_dokter_racikan_detail.kode_brng', '=', 'databarang.kode_brng')
                        ->where('resep_dokter_racikan_detail.no_resep', $r->no_resep)
                        ->where('resep_dokter_racikan_detail.nama_racik', $racik->nama_racik)
                        ->select('resep_dokter_racikan_detail.*', 'databarang.nama_brng')
                        ->get();
                    return $racik;
                });
                return $r;
            });

        $groupedResep = $this->groupResep($resep);
            
        return Inertia::render('Farmasi/ResepMasuk', [
            'resep' => $groupedResep,
            'filters' => [
                'tgl_awal' => $tgl_awal,
                'tgl_akhir' => $tgl_akhir
            ],
            'title' => 'Riwayat Resep Keluar',
            'type' => 'keluar'
        ]);
    }

    private function groupResep($resep) {
        return $resep->groupBy('no_rawat')->map(function($group, $no_rawat) {
            $first = $group->first();
            return [
                'no_rawat' => $no_rawat,
                'pasien' => $first->registrasi->pasien ?? null,
                'dokter' => $first->dokter ?? null,
                'tgl_perawatan' => $first->tgl_perawatan,
                'jam_perawatan' => $first->jam_perawatan,
                'tgl_penyerahan' => $first->tgl_penyerahan,
                'jam_penyerahan' => $first->jam_penyerahan,
                'all_items' => $group->flatMap(function($r) {
                    return $r->detail;
                }),
                'all_racikan' => $group->flatMap(function($r) {
                    return $r->racikan ?? [];
                })
            ];
        })->values();
    }

    public function confirmResep(Request $request)
    {
        $request->validate([
            'no_rawat' => 'required'
        ]);

        try {
            DB::beginTransaction();

            $reseps = ResepObat::where('no_rawat', $request->no_rawat)
                ->whereNull('tgl_penyerahan')
                ->with('detail')
                ->get();

            if ($reseps->isEmpty()) {
                throw new \Exception("Tidak ada resep aktif untuk No. Rawat ini.");
            }

            foreach ($reseps as $resep) {
                // 1. Update Resep Status
                $resep->update([
                    'tgl_penyerahan' => date('Y-m-d'),
                    'jam_penyerahan' => date('H:i:s')
                ]);

                // 2. Reduce Stock
                foreach ($resep->detail as $item) {
                    $stok = StokObat::where('kode_brng', $item->kode_brng)->first();
                    if ($stok) {
                        $stok->decrement('stok', $item->jml);
                    }
                }
            }

            DB::commit();
            return redirect()->back()->with('success', 'Semua resep pasien ini berhasil diselesaikan.');

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Gagal memproses resep: ' . $e->getMessage());
        }
    }

    public function updateResepItem(Request $request)
    {
        $request->validate([
            'no_resep' => 'required',
            'kode_brng' => 'required',
            'new_kode_brng' => 'nullable', // Kode barang baru pengganti
            'jml' => 'required|numeric',
            'aturan_pakai' => 'required'
        ]);

        try {
            DB::beginTransaction();

            $old = DB::table('resep_dokter')
                ->where('no_resep', $request->no_resep)
                ->where('kode_brng', $request->kode_brng)
                ->first();

            if (!$old) {
                throw new \Exception("Item resep tidak ditemukan!");
            }

            $kode_brng_final = $request->kode_brng;

            // 1. Kondisi: Ganti Obat (Substitusi)
            if ($request->filled('new_kode_brng') && $request->new_kode_brng !== $request->kode_brng) {
                // Kembalikan stok lama
                DB::table('stok_obat')->where('kode_brng', $request->kode_brng)->increment('stok', (double)$old->jml);

                // Kurangi stok pengganti baru
                $stok_baru = DB::table('stok_obat')->where('kode_brng', $request->new_kode_brng)->first();
                if (!$stok_baru || $stok_baru->stok < (double)$request->jml) {
                    $nama_brng = DB::table('databarang')->where('kode_brng', $request->new_kode_brng)->value('nama_brng');
                    throw new \Exception("Stok pengganti '{$nama_brng}' tidak mencukupi.");
                }

                DB::table('stok_obat')->where('kode_brng', $request->new_kode_brng)->decrement('stok', (double)$request->jml);
                $kode_brng_final = $request->new_kode_brng;

            } else {
                // 2. Kondisi: Hanya Volume Berubah
                $selisih = (double)$request->jml - (double)$old->jml;
                if ($selisih > 0) {
                    $stok_ada = DB::table('stok_obat')->where('kode_brng', $request->kode_brng)->value('stok');
                    if ($stok_ada < $selisih) throw new \Exception("Stok tidak mencukupi untuk penambahan kuantitas.");
                    DB::table('stok_obat')->where('kode_brng', $request->kode_brng)->decrement('stok', $selisih);
                } else if ($selisih < 0) {
                    DB::table('stok_obat')->where('kode_brng', $request->kode_brng)->increment('stok', abs($selisih));
                }
            }

            DB::table('resep_dokter')
                ->where('no_resep', $request->no_resep)
                ->where('kode_brng', $request->kode_brng)
                ->update([
                    'kode_brng' => $kode_brng_final,
                    'jml' => (double)$request->jml,
                    'aturan_pakai' => $request->aturan_pakai
                ]);

            DB::commit();
            return redirect()->back()->with('success', 'Item resep berhasil diperbarui.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['message' => 'Gagal memperbarui item: ' . $e->getMessage()]);
        }
    }

    public function deleteResepItem(Request $request)
    {
        try {
            DB::table('resep_dokter')
                ->where('no_resep', $request->no_resep)
                ->where('kode_brng', $request->kode_brng)
                ->delete();

            return redirect()->back()->with('success', 'Item resep berhasil dihapus.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menghapus item: ' . $e->getMessage());
        }
    }

    public function updateResepRacikan(Request $request)
    {
        $request->validate([
            'no_resep' => 'required',
            'nama_racik' => 'required',
            'jml_dr' => 'required|numeric',
            'aturan_pakai' => 'required'
        ]);

        try {
            DB::beginTransaction();

            $old = DB::table('resep_dokter_racikan')
                ->where('no_resep', $request->no_resep)
                ->where('nama_racik', $request->nama_racik)
                ->first();

            if (!$old) {
                throw new \Exception("Data Racikan tidak ditemukan!");
            }

            $old_jml = (double)$old->jml_dr;
            $new_jml = (double)$request->jml_dr;

            // 1. Update Header
            DB::table('resep_dokter_racikan')
                ->where('no_resep', $request->no_resep)
                ->where('nama_racik', $request->nama_racik)
                ->update([
                    'jml_dr' => $new_jml,
                    'aturan_pakai' => $request->aturan_pakai
                ]);

            // 2. Adjust Stock Details
            $details = DB::table('resep_dokter_racikan_detail')
                ->where('no_resep', $request->no_resep)
                ->where('nama_racik', $request->nama_racik)
                ->get();

            foreach ($details as $b) {
                $dosis = (double)$b->jml; // Dosis per bungkus
                $qty_lama = $dosis * $old_jml;
                $qty_baru = $dosis * $new_jml;
                $selisih = $qty_baru - $qty_lama;

                if ($selisih > 0) {
                    // Cek Kecukupan Stok sebelum potong tambahan
                    $stok = DB::table('stok_obat')->where('kode_brng', $b->kode_brng)->first();
                    if (!$stok || $stok->stok < $selisih) {
                        $nama_brng = DB::table('databarang')->where('kode_brng', $b->kode_brng)->value('nama_brng');
                        throw new \Exception("Stok {$nama_brng} tidak mencukupi untuk penambahan porsi racik.");
                    }
                    DB::table('stok_obat')->where('kode_brng', $b->kode_brng)->decrement('stok', $selisih);
                } else if ($selisih < 0) {
                    DB::table('stok_obat')->where('kode_brng', $b->kode_brng)->increment('stok', abs($selisih));
                }
            }

            DB::commit();
            return redirect()->back()->with('success', 'Resep Racikan berhasil diperbarui.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Gagal memperbarui racikan: ' . $e->getMessage());
        }
    }

    public function deleteResepRacikan(Request $request)
    {
        $request->validate([
            'no_resep' => 'required',
            'nama_racik' => 'required'
        ]);

        try {
            DB::beginTransaction();

            $racik = DB::table('resep_dokter_racikan')
                ->where('no_resep', $request->no_resep)
                ->where('nama_racik', $request->nama_racik)
                ->first();

            if (!$racik) {
                throw new \Exception("Data Racikan tidak ditemukan!");
            }

            $details = DB::table('resep_dokter_racikan_detail')
                ->where('no_resep', $request->no_resep)
                ->where('nama_racik', $request->nama_racik)
                ->get();

            // 1. Kembalikan Stok
            foreach ($details as $b) {
                $total_kembali = (double)$b->jml * (double)$racik->jml_dr;
                DB::table('stok_obat')->where('kode_brng', $b->kode_brng)->increment('stok', $total_kembali);
            }

            // 2. Delete Detail & Header
            DB::table('resep_dokter_racikan_detail')->where('no_resep', $request->no_resep)->where('nama_racik', $request->nama_racik)->delete();
            DB::table('resep_dokter_racikan')->where('no_resep', $request->no_resep)->where('nama_racik', $request->nama_racik)->delete();

            DB::commit();
            return redirect()->back()->with('success', 'Resep Racikan berhasil dihapus.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Gagal menghapus racikan: ' . $e->getMessage());
        }
    }

    public function updateResepRacikanDetail(Request $request)
    {
        $request->validate([
            'id' => 'required', // ⬅️ Acuan ID Unik
            'no_resep' => 'required',
            'nama_racik' => 'required',
            'new_kode_brng' => 'nullable',
            'jml' => 'required|numeric'
        ]);

        try {
            DB::beginTransaction();

            $racik = DB::table('resep_dokter_racikan')
                ->where('no_resep', $request->no_resep)
                ->where('nama_racik', $request->nama_racik)
                ->first();

            if (!$racik) {
                throw new \Exception("Data Racikan tidak ditemukan!");
            }

            $old_detail = DB::table('resep_dokter_racikan_detail')
                ->where('id', $request->id) // ⬅️ Gunakan ID
                ->first();

            if (!$old_detail) {
                throw new \Exception("Bahan racikan tidak ditemukan!");
            }

            $kode_brng_final = $old_detail->kode_brng;
            $jml_dr = (double)$racik->jml_dr;

            // 1. Kondisi: Ganti Bahan (Substitusi)
            if ($request->filled('new_kode_brng') && $request->new_kode_brng !== $old_detail->kode_brng) {
                $qty_lama = (double)$old_detail->jml * $jml_dr;
                DB::table('stok_obat')->where('kode_brng', $old_detail->kode_brng)->increment('stok', $qty_lama);
                
                $qty_baru = (double)$request->jml * $jml_dr;
                $stok_baru = DB::table('stok_obat')->where('kode_brng', $request->new_kode_brng)->first();
                if (!$stok_baru || $stok_baru->stok < $qty_baru) {
                    $nama_brng = DB::table('databarang')->where('kode_brng', $request->new_kode_brng)->value('nama_brng');
                    throw new \Exception("Stok pengganti '{$nama_brng}' tidak mencukupi.");
                }

                DB::table('stok_obat')->where('kode_brng', $request->new_kode_brng)->decrement('stok', $qty_baru);
                $kode_brng_final = $request->new_kode_brng;

            } else {
                // 2. Kondisi: Hanya Dosis Berubah
                $dosis_lama = (double)$old_detail->jml;
                $dosis_baru = (double)$request->jml;
                $selisih_qty = ($dosis_baru - $dosis_lama) * $jml_dr;

                if ($selisih_qty > 0) {
                    $stok_ada = DB::table('stok_obat')->where('kode_brng', $old_detail->kode_brng)->value('stok');
                    if ($stok_ada < $selisih_qty) throw new \Exception("Stok tidak mencukupi untuk penambahan dosis.");
                    DB::table('stok_obat')->where('kode_brng', $old_detail->kode_brng)->decrement('stok', $selisih_qty);
                } else if ($selisih_qty < 0) {
                    DB::table('stok_obat')->where('kode_brng', $old_detail->kode_brng)->increment('stok', abs($selisih_qty));
                }
            }

            DB::table('resep_dokter_racikan_detail')
                ->where('id', $request->id) // ⬅️ Gunakan ID
                ->update([
                    'kode_brng' => $kode_brng_final,
                    'jml' => (double)$request->jml
                ]);

            DB::commit();
            return redirect()->back()->with('success', 'Bahan racikan berhasil diperbarui.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['message' => 'Gagal memperbarui bahan racikan: ' . $e->getMessage()]);
        }
    }

    public function indexStok() {
        $stok = DataBarang::leftJoin('stok_obat', 'databarang.kode_brng', '=', 'stok_obat.kode_brng')
            ->select('databarang.*', 'stok_obat.stok')
            ->orderBy('databarang.nama_brng', 'asc')
            ->get();
            
        return Inertia::render('Farmasi/StokInventori', [
            'stok' => $stok
        ]);
    }

    public function indexOpname() {
        // Alur Detil: Ambil stok terakhir dari riwayat audit (stok_opname)
        // Kalau tabel stok_opname kosong, otomatis stok di layar jadi 0 (Gambar 1 -> Gambar 2)
        $stok = DataBarang::orderBy('nama_brng', 'asc')->get()->map(function($item) {
            $last = DB::table('stok_opname')
                ->where('kode_brng', $item->kode_brng)
                ->orderBy('created_at', 'desc')
                ->first();
            
            $item->stok = $last ? $last->stok_sistem : 0;
            return $item;
        });
            
        return Inertia::render('Farmasi/StokOpname', [
            'stok' => $stok
        ]);
    }

    public function storeOpname(Request $request)
    {
        // CCTV: Catat data masuk
        \Log::info('LOG OPNAME ADJUSTMENT:', $request->all());

        $request->validate([
            'items' => 'required|array',
            'tgl_opname' => 'required|date'
        ]);

        try {
            DB::beginTransaction();

            $sukses = 0;
            foreach ($request->items as $item) {
                // Nilai penyesuaian (Misal: -3)
                $adj = (float)($item['penyesuaian'] ?? 0);
                if ($adj == 0) continue; 

                $kode = $item['kode_brng'];
                // Buat nomor OPNAME unik per item (Maksimal 20 Karakter)
                $no_opname = 'OP' . date('YmdHis') . sprintf('%03d', $sukses + 1);
                $stok_sistem_lama = (float)($item['stok_sistem'] ?? 0);
                
                // MATEMATIKA: 30 + (-3) = 27
                $stok_baru = $stok_sistem_lama + $adj;

                // 1. Simpan Riwayat (Pakai NJ (No Nota) yang sama)
                DB::table('stok_opname')->insert([
                    'no_opname' => $no_opname,
                    'tgl_opname' => $request->tgl_opname,
                    'kode_brng' => $kode,
                    'stok_sistem' => $stok_baru, // Hasil akhir (27)
                    'stok_fisik' => $stok_baru,
                    'selisih' => $adj,
                    'keterangan' => 'Audit Penyesuaian Stok',
                    'created_at' => now(),
                    'updated_at' => now()
                ]);

                // 2. Update Saldo Berjalan (Update Gudang)
                DB::table('stok_obat')->updateOrInsert(
                    ['kode_brng' => $kode],
                    ['stok' => $stok_baru, 'updated_at' => now()]
                );
                $sukses++;
            }

            DB::commit();
            return redirect()->back()->with('success', "Stok berhasil diperbarui ($sukses item).");

        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('ERROR MATH OPNAME: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Gagal: ' . $e->getMessage());
        }
    }

    public function indexPenerimaan(Request $request) {
        $search = $request->search;
        $tgl_awal = $request->tgl_awal ?? date('Y-m-d');
        $tgl_akhir = $request->tgl_akhir ?? date('Y-m-d');

        $penerimaan = DB::table('penerimaan_obat')
            ->whereBetween('tgl_penerimaan', [$tgl_awal, $tgl_akhir])
            ->where(function($q) use ($search) {
                if ($search) {
                    $q->where('no_faktur', 'like', "%$search%")
                      ->orWhere('supplier', 'like', "%$search%");
                }
            })
            ->orderBy('tgl_penerimaan', 'desc')
            ->get();

        $barang = DataBarang::where('status', '1')->orderBy('nama_brng', 'asc')->get();
            
        return Inertia::render('Farmasi/Penerimaan', [
            'penerimaan' => $penerimaan,
            'barang' => $barang,
            'filters' => [
                'search' => $search,
                'tgl_awal' => $tgl_awal,
                'tgl_akhir' => $tgl_akhir
            ]
        ]);
    }

    public function storePenerimaan(Request $request)
    {
        $request->validate([
            'no_faktur' => 'required|unique:penerimaan_obat,no_faktur',
            'tgl_penerimaan' => 'required|date',
            'supplier' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.kode_brng' => 'required|exists:databarang,kode_brng',
            'items.*.jml' => 'required|numeric|min:1',
            'items.*.harga_beli' => 'required|numeric|min:0',
            'items.*.tgl_expired' => 'nullable|date'
        ]);

        try {
            DB::beginTransaction();

            $total_bayar = collect($request->items)->sum(function($item) {
                return $item['jml'] * $item['harga_beli'];
            });

            // 1. Header
            DB::table('penerimaan_obat')->insert([
                'no_faktur' => $request->no_faktur,
                'tgl_penerimaan' => $request->tgl_penerimaan,
                'supplier' => $request->supplier,
                'total_bayar' => $total_bayar,
                'created_at' => now(),
                'updated_at' => now()
            ]);

            // 2. Details & Stock Update
            foreach ($request->items as $item) {
                DB::table('detail_penerimaan_obat')->insert([
                    'no_faktur' => $request->no_faktur,
                    'kode_brng' => $item['kode_brng'],
                    'jml' => $item['jml'],
                    'harga_beli' => $item['harga_beli'],
                    'tgl_expired' => $item['tgl_expired'],
                    'created_at' => now(),
                    'updated_at' => now()
                ]);

                // Update stock realtime
                DB::table('stok_obat')->updateOrInsert(
                    ['kode_brng' => $item['kode_brng']],
                    ['stok' => DB::raw("stok + " . $item['jml']), 'updated_at' => now()]
                );
            }

            DB::commit();
            return redirect()->back()->with('success', 'Penerimaan barang berhasil disimpan.');

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Gagal: ' . $e->getMessage());
        }
    }

    public function getDetailsPenerimaan($no_faktur)
    {
        $details = DB::table('detail_penerimaan_obat')
            ->join('databarang', 'detail_penerimaan_obat.kode_brng', '=', 'databarang.kode_brng')
            ->where('no_faktur', $no_faktur)
            ->select('detail_penerimaan_obat.*', 'databarang.nama_brng', 'databarang.kode_sat')
            ->get();

        return response()->json($details);
    }

    public function destroyResep(Request $request)
    {
        $no_rawat = $request->no_rawat;
        try {
            DB::beginTransaction();
            
            // 1. Ambil semua no_resep yang terhubung ke no_rawat ini
            $no_reseps = DB::table('resep_obat')->where('no_rawat', $no_rawat)->pluck('no_resep');
            
            if ($no_reseps->isNotEmpty()) {
                // 2. Hapus detail racikan & item reguler
                DB::table('resep_dokter_racikan_detail')->whereIn('no_resep', $no_reseps)->delete();
                DB::table('resep_dokter_racikan')->whereIn('no_resep', $no_reseps)->delete();
                DB::table('resep_dokter')->whereIn('no_resep', $no_reseps)->delete();
                // 3. Hapus master resep_obat
                DB::table('resep_obat')->where('no_rawat', $no_rawat)->delete();
            }
            
            DB::commit();
            return redirect()->back()->with('success', 'Resep berhasil dihapus.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['message' => 'Gagal menghapus resep: ' . $e->getMessage()]);
        }
    }
 
    public function destroyPenerimaan($no_faktur)
    {
        try {
            DB::beginTransaction();

            $details = DB::table('detail_penerimaan_obat')->where('no_faktur', $no_faktur)->get();

            // 1. Correct the stock (subtract what was added)
            foreach ($details as $item) {
                DB::table('stok_obat')
                    ->where('kode_brng', $item->kode_brng)
                    ->decrement('stok', $item->jml);
            }

            // 2. Delete the records
            DB::table('penerimaan_obat')->where('no_faktur', $no_faktur)->delete();

            DB::commit();
            return redirect()->back()->with('success', 'Faktur penerimaan berhasil dihapus dan stok telah dikoreksi.');

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Gagal menghapus: ' . $e->getMessage());
        }
    }

    public function updatePenerimaan(Request $request, $no_faktur)
    {
        $request->validate([
            'no_faktur' => 'required',
            'tgl_penerimaan' => 'required|date',
            'items' => 'required|array|min:1'
        ]);

        try {
            DB::beginTransaction();

            // 1. Revert OLD stock
            $oldDetails = DB::table('detail_penerimaan_obat')->where('no_faktur', $no_faktur)->get();
            foreach ($oldDetails as $old) {
                DB::table('stok_obat')->where('kode_brng', $old->kode_brng)->decrement('stok', $old->jml);
            }

            // 2. Delete OLD details
            DB::table('detail_penerimaan_obat')->where('no_faktur', $no_faktur)->delete();

            // 3. Update Header
            $total_bayar = collect($request->items)->sum(fn($i) => $i['jml'] * $i['harga_beli']);
            DB::table('penerimaan_obat')->where('no_faktur', $no_faktur)->update([
                'no_faktur' => $request->no_faktur,
                'tgl_penerimaan' => $request->tgl_penerimaan,
                'supplier' => $request->supplier,
                'total_bayar' => $total_bayar,
                'updated_at' => now()
            ]);

            // 4. Insert NEW details and apply NEW stock
            foreach ($request->items as $item) {
                DB::table('detail_penerimaan_obat')->insert([
                    'no_faktur' => $request->no_faktur,
                    'kode_brng' => $item['kode_brng'],
                    'jml' => $item['jml'],
                    'harga_beli' => $item['harga_beli'],
                    'tgl_expired' => $item['tgl_expired'],
                    'created_at' => now(),
                    'updated_at' => now()
                ]);

                DB::table('stok_obat')->updateOrInsert(
                    ['kode_brng' => $item['kode_brng']],
                    ['stok' => DB::raw("stok + " . $item['jml']), 'updated_at' => now()]
                );
            }

            DB::commit();
            return redirect()->back()->with('success', 'Faktur penerimaan berhasil diperbarui dan stok telah disesuaikan.');

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Gagal update: ' . $e->getMessage());
        }
    }

    public function indexExpired() {
        $data = DB::table('detail_penerimaan_obat')
            ->join('databarang', 'detail_penerimaan_obat.kode_brng', '=', 'databarang.kode_brng')
            ->join('penerimaan_obat', 'detail_penerimaan_obat.no_faktur', '=', 'penerimaan_obat.no_faktur')
            ->select(
                'detail_penerimaan_obat.*',
                'databarang.nama_brng',
                'databarang.kode_sat',
                'penerimaan_obat.supplier',
                'penerimaan_obat.tgl_penerimaan'
            )
            ->whereNotNull('detail_penerimaan_obat.tgl_expired')
            ->orderBy('detail_penerimaan_obat.tgl_expired', 'asc')
            ->get();

        $expired = $data->map(function($item) {
            $ed = \Carbon\Carbon::parse($item->tgl_expired);
            $now = \Carbon\Carbon::now();
            $days = $now->diffInDays($ed, false);
            
            $status = 'Aman';
            $color = 'emerald';
            
            if ($days <= 0) {
                $status = 'Sudah Kedaluwarsa';
                $color = 'rose';
            } elseif ($days <= 90) {
                $status = 'Segera Kedaluwarsa';
                $color = 'amber';
            }

            $item->status = $status;
            $item->color = $color;
            $item->sisa_hari = $days;
            return $item;
        });

        return Inertia::render('Farmasi/MonitoringED', [
            'expired' => $expired
        ]);
    }

    public function indexLaporan(Request $request) {
        $tgl_awal = $request->tgl_awal ?: date('Y-m-d');
        $tgl_akhir = $request->tgl_akhir ?: date('Y-m-d');

        // 1. Summary Cards
        $total_resep_hari_ini = DB::table('resep_obat')
            ->where('tgl_perawatan', date('Y-m-d'))
            ->count();

        $obat_aktif = DB::table('databarang')
            ->where('status', '1')
            ->count();

        $stok_menipis = DB::table('stok_obat')
            ->where('stok', '<', 10)
            ->count();

        $nilai_aset = DB::table('stok_obat')
            ->join('databarang', 'stok_obat.kode_brng', '=', 'databarang.kode_brng')
            ->sum(DB::raw('stok_obat.stok * databarang.hargajual'));

        // 2. Charts Trend (Last 7 Days)
        $chart_data = DB::table('resep_obat')
            ->where('tgl_perawatan', '>=', date('Y-m-d', strtotime('-7 days')))
            ->select('tgl_perawatan', DB::raw('count(*) as total'))
            ->groupBy('tgl_perawatan')
            ->orderBy('tgl_perawatan', 'asc')
            ->get();

        // 3. List Resep (Filterable)
        $list_resep = ResepObat::with(['pasien', 'dokter', 'detail.barang'])
            ->whereBetween('tgl_perawatan', [$tgl_awal, $tgl_akhir])
            ->orderBy('tgl_perawatan', 'desc')
            ->orderBy('jam_perawatan', 'desc')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Farmasi/Laporan', [
            'summary' => [
                'total_resep_hari_ini' => $total_resep_hari_ini,
                'obat_aktif' => $obat_aktif,
                'stok_menipis' => $stok_menipis,
                'nilai_aset' => (double)$nilai_aset
            ],
            'chart_data' => $chart_data,
            'list_resep' => $list_resep,
            'filters' => [
                'tgl_awal' => $tgl_awal,
                'tgl_akhir' => $tgl_akhir
            ]
        ]);
    }

    public function storeObat(Request $request)
    {
        $request->validate([
            'kode_brng' => 'required|unique:databarang,kode_brng|max:15',
            'nama_brng' => 'required|max:80',
            'kode_sat' => 'required|max:4',
            'hargajual' => 'required|numeric|min:0',
            'status' => 'required|in:1,0'
        ]);

        DataBarang::create($request->all());

        return redirect()->back()->with('success', 'Data obat berhasil ditambahkan.');
    }

    public function updateObat(Request $request, $kode_brng)
    {
        $request->validate([
            'nama_brng' => 'required|max:80',
            'kode_sat' => 'required|max:4',
            'hargajual' => 'required|numeric|min:0',
            'status' => 'required|in:1,0'
        ]);

        $obat = DataBarang::findOrFail($kode_brng);
        $obat->update($request->all());

        return redirect()->back()->with('success', 'Data obat berhasil diperbarui.');
    }

    public function destroyObat($kode_brng)
    {
        try {
            $obat = DataBarang::findOrFail($kode_brng);
            
            // Check dependency
            $hasStock = DB::table('stok_obat')->where('kode_brng', $kode_brng)->where('stok', '>', 0)->exists();
            if ($hasStock) {
                return redirect()->back()->with('error', 'Obat tidak bisa dihapus karena masih ada stok.');
            }

            $obat->delete();
            return redirect()->back()->with('success', 'Data obat berhasil dihapus.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menghapus obat: ' . $e->getMessage());
        }
    }
}
