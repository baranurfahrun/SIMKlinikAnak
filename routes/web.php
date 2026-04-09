<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RekamMedisController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware(['auth:admin,pegawai'])->group(function () {
    Route::get('/dashboard', function () {
        $tgl_sekarang = date('Y-m-d');
        
        $antrianHariIni = \App\Models\RegPeriksa::where('tgl_registrasi', $tgl_sekarang)->count();
        $terlayani = \App\Models\RegPeriksa::where('tgl_registrasi', $tgl_sekarang)->where('stts', 'Sudah')->count();
        
        $antrianLive = \App\Models\RegPeriksa::with(['pasien', 'dokter'])
            ->where('tgl_registrasi', $tgl_sekarang)
            ->whereIn('stts', ['Belum', 'Sudah'])
            ->orderBy('no_reg', 'asc')
            ->get();

        return Inertia::render('Dashboard', [
            'antrianHariIni' => $antrianHariIni,
            'terlayani' => $terlayani,
            'antrianLive' => $antrianLive
        ]);
    })->name('dashboard');

    // Modul Pendaftaran Pasien
    Route::resource('pasien', \App\Http\Controllers\PasienController::class);
    Route::post('/pasien/{pasien}/register', [\App\Http\Controllers\PasienController::class, 'registerToPoli'])->name('pasien.register');

    // Modul Registrasi Periksa (Antrian Poli)
    Route::get('/registrasi', [\App\Http\Controllers\RegPeriksaController::class, 'index'])->name('registrasi.index');
    Route::post('/registrasi', [\App\Http\Controllers\RegPeriksaController::class, 'store'])->name('registrasi.store');
    Route::get('/api/pasiens/search', [\App\Http\Controllers\RegPeriksaController::class, 'searchPasien'])->name('api.pasiens.search');
    Route::get('/api/pasien/{no_rkm_medis}/growth', function($no_rkm_medis) {
        $data = \Illuminate\Support\Facades\DB::table('pemeriksaan_ralan')
            ->join('reg_periksa', 'pemeriksaan_ralan.no_rawat', '=', 'reg_periksa.no_rawat')
            ->where('reg_periksa.no_rkm_medis', $no_rkm_medis)
            ->select('pemeriksaan_ralan.tgl_pemeriksaan', 'pemeriksaan_ralan.berat', 'pemeriksaan_ralan.tinggi')
            ->orderBy('pemeriksaan_ralan.tgl_pemeriksaan', 'asc')
            ->get();
        $pasien = \App\Models\Pasien::where('no_rkm_medis', $no_rkm_medis)->first(['nm_pasien', 'tgl_lahir']);
        return response()->json(['status' => 'success', 'data' => $data, 'pasien' => $pasien]);
    })->name('api.pasien.growth');

    Route::get('/api/dokter', [\App\Http\Controllers\PegawaiController::class, 'getDokterList'])->name('api.dokter');
    Route::delete('/registrasi/{no_rawat}', [\App\Http\Controllers\RegPeriksaController::class, 'destroy'])
        ->name('registrasi.destroy')
        ->where('no_rawat', '.*');

    // Modul Rekam Medis (RME)
    Route::get('/rekam-medis', [RekamMedisController::class, 'index'])->name('rekam-medis.index');
    Route::get('/rekam-medis/create/{no_rawat}', [RekamMedisController::class, 'create'])->name('rekam-medis.create')->where('no_rawat', '.*');
    Route::post('/rekam-medis', [RekamMedisController::class, 'store'])->name('rekam-medis.store');
    Route::put('/rekam-medis', [RekamMedisController::class, 'update'])->name('rekam-medis.update');
    Route::delete('/rekam-medis', [RekamMedisController::class, 'destroy'])->name('rekam-medis.destroy');
    Route::delete('/rekam-medis/template/{id}', [RekamMedisController::class, 'destroyTemplate'])->name('rekam-medis.template.destroy');

    // Modul Farmasi
    Route::prefix('farmasi')->name('farmasi.')->group(function() {
        Route::get('/create/{no_rawat}', [\App\Http\Controllers\FarmasiController::class, 'create'])->name('create')->where('no_rawat', '.*');
        Route::post('/', [\App\Http\Controllers\FarmasiController::class, 'store'])->name('store');
        
        // Menu Baru
        Route::get('/resep-masuk', [\App\Http\Controllers\FarmasiController::class, 'indexResepMasuk'])->name('resep.masuk');
        Route::get('/resep-keluar', [\App\Http\Controllers\FarmasiController::class, 'indexResepKeluar'])->name('resep.keluar');
        Route::post('/resep/confirm', [\App\Http\Controllers\FarmasiController::class, 'confirmResep'])->name('resep.confirm');
        Route::put('/resep/item', [\App\Http\Controllers\FarmasiController::class, 'updateResepItem'])->name('resep.item.update');
        Route::delete('/resep/item', [\App\Http\Controllers\FarmasiController::class, 'deleteResepItem'])->name('resep.item.destroy');
        Route::put('/resep/racikan', [\App\Http\Controllers\FarmasiController::class, 'updateResepRacikan'])->name('resep.racikan.update');
        Route::delete('/resep/racikan', [\App\Http\Controllers\FarmasiController::class, 'deleteResepRacikan'])->name('resep.racikan.destroy');
        Route::put('/resep/racikan-detail', [\App\Http\Controllers\FarmasiController::class, 'updateResepRacikanDetail'])->name('resep.racikan_detail.update');
        Route::delete('/resep', [\App\Http\Controllers\FarmasiController::class, 'destroyResep'])->name('resep.destroy');
        Route::get('/stok', [\App\Http\Controllers\FarmasiController::class, 'indexStok'])->name('stok');
        Route::post('/stok', [\App\Http\Controllers\FarmasiController::class, 'storeObat'])->name('stok.store');
        Route::put('/stok/{kode_brng}', [\App\Http\Controllers\FarmasiController::class, 'updateObat'])->name('stok.update');
        Route::delete('/stok/{kode_brng}', [\App\Http\Controllers\FarmasiController::class, 'destroyObat'])->name('stok.destroy');
        Route::get('/opname', [\App\Http\Controllers\FarmasiController::class, 'indexOpname'])->name('opname');
        Route::post('/opname', [\App\Http\Controllers\FarmasiController::class, 'storeOpname'])->name('opname.store');
        Route::get('/penerimaan', [\App\Http\Controllers\FarmasiController::class, 'indexPenerimaan'])->name('penerimaan');
        Route::post('/penerimaan', [\App\Http\Controllers\FarmasiController::class, 'storePenerimaan'])->name('penerimaan.store');
        Route::get('/penerimaan/details/{no_faktur}', [\App\Http\Controllers\FarmasiController::class, 'getDetailsPenerimaan'])->name('penerimaan.details');
        Route::put('/penerimaan/{no_faktur}', [\App\Http\Controllers\FarmasiController::class, 'updatePenerimaan'])->name('penerimaan.update');
        Route::delete('/penerimaan/{no_faktur}', [\App\Http\Controllers\FarmasiController::class, 'destroyPenerimaan'])->name('penerimaan.destroy');
        Route::get('/expired', [\App\Http\Controllers\FarmasiController::class, 'indexExpired'])->name('expired');
        Route::get('/laporan', [\App\Http\Controllers\FarmasiController::class, 'indexLaporan'])->name('laporan');
    });

    // Modul Kepegawaian
    Route::get('/kepegawaian', [\App\Http\Controllers\PegawaiController::class, 'index'])->name('kepegawaian.index');
    Route::post('/kepegawaian/dokter', [\App\Http\Controllers\PegawaiController::class, 'storeDokter'])->name('kepegawaian.dokter.store');
    Route::put('/kepegawaian/dokter/{kd_dokter}', [\App\Http\Controllers\PegawaiController::class, 'updateDokter'])->name('kepegawaian.dokter.update');
    Route::delete('/kepegawaian/dokter/{kd_dokter}', [\App\Http\Controllers\PegawaiController::class, 'destroyDokter'])->name('kepegawaian.dokter.destroy');

    Route::post('/kepegawaian/staf', [\App\Http\Controllers\PegawaiController::class, 'storeStaf'])->name('kepegawaian.staf.store');
    Route::put('/kepegawaian/staf/{id_user}', [\App\Http\Controllers\PegawaiController::class, 'updateStaf'])->name('kepegawaian.staf.update');
    Route::delete('/kepegawaian/staf/{id_user}', [\App\Http\Controllers\PegawaiController::class, 'destroyStaf'])->name('kepegawaian.staf.destroy');

    // Modul Pengaturan
    // Modul Pengaturan
    Route::prefix('pengaturan')->group(function() {
        // Hanya Admin yang bisa atur database
        Route::get('/database', [\App\Http\Controllers\DatabaseSettingController::class, 'index'])->name('pengaturan.database')->middleware('admin.only');
        Route::post('/database/test', [\App\Http\Controllers\DatabaseSettingController::class, 'testConnection'])->name('pengaturan.database.test')->middleware('admin.only');
        Route::post('/database/save', [\App\Http\Controllers\DatabaseSettingController::class, 'saveConnection'])->name('pengaturan.database.save')->middleware('admin.only');
        
        // Manajemen Akun (Bisa dilihat oleh semua, ksh filter di controller)
        Route::get('/akun', [\App\Http\Controllers\AccountController::class, 'index'])->name('akun.index');
        Route::post('/akun/store', [\App\Http\Controllers\AccountController::class, 'store'])->name('akun.store')->middleware('admin.only');
        Route::post('/akun/update', [\App\Http\Controllers\AccountController::class, 'update'])->name('akun.update');
        Route::delete('/akun/{id}', [\App\Http\Controllers\AccountController::class, 'destroy'])->name('akun.destroy')->middleware('admin.only');
        Route::post('/akun/update-access/{id}', [\App\Http\Controllers\AccountController::class, 'updateAccess'])->name('akun.update_access')->middleware('admin.only');
        Route::post('/profile/update', [\App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');

        // Konfigurasi Sistem
        Route::get('/sistem', [\App\Http\Controllers\SystemSettingController::class, 'index'])->name('pengaturan.sistem');
        Route::post('/sistem/save', [\App\Http\Controllers\SystemSettingController::class, 'update'])->name('pengaturan.sistem.save');
    });

    // Modul Kasir & Billing
    Route::prefix('kasir')->middleware('auth')->group(function() {
        Route::get('/tarif', [\App\Http\Controllers\TarifController::class, 'index'])->name('kasir.tarif.index');
        Route::post('/tarif/store', [\App\Http\Controllers\TarifController::class, 'store'])->name('kasir.tarif.store');
        Route::put('/tarif/update/{id}', [\App\Http\Controllers\TarifController::class, 'update'])->name('kasir.tarif.update');
        Route::delete('/tarif/destroy/{id}', [\App\Http\Controllers\TarifController::class, 'destroy'])->name('kasir.tarif.destroy');

        // Menu Tagihan Pasien
        Route::get('/tagihan', [\App\Http\Controllers\KasirController::class, 'tagihanIndex'])->name('kasir.tagihan.index');
        Route::get('/tagihan/data/{no_rawat}', [\App\Http\Controllers\KasirController::class, 'getTagihanData'])
            ->name('kasir.tagihan.data')
            ->where('no_rawat', '.*');
        Route::post('/tagihan/store-tindakan', [\App\Http\Controllers\KasirController::class, 'storeTindakan'])->name('kasir.tagihan.store_tindakan');
        Route::delete('/tagihan/destroy-tindakan/{id}', [\App\Http\Controllers\KasirController::class, 'destroyTindakan'])->name('kasir.tagihan.destroy_tindakan');
        Route::post('/tagihan/toggle-closing', [\App\Http\Controllers\KasirController::class, 'toggleClosing'])->name('kasir.tagihan.toggle_closing');
    });

    Route::get('/api/farmasi/obat', [\App\Http\Controllers\FarmasiController::class, 'searchObat'])->name('api.farmasi.obat');
});

require __DIR__.'/auth.php';
Route::get("/debug-auth", function () { return ["admin_check" => Auth::guard("admin")->check(), "admin_user" => Auth::guard("admin")->user(), "pegawai_check" => Auth::guard("pegawai")->check(), "pegawai_user" => Auth::guard("pegawai")->user(), "session_all" => session()->all()]; });

Route::get('/sim-login', function() { Auth::guard('pegawai')->login(\App\Models\UserPegawai::first()); return redirect('/dashboard'); });

Route::get('/debug-inertia-user', function(Illuminate\Http\Request $req) { return ['admin' => $req->user('admin'), 'pegawai' => $req->user('pegawai')]; });

Route::get('/debug-db', function() {
    $rows = \App\Models\RegPeriksa::where('tgl_registrasi', date('Y-m-d'))->get(['no_rawat', 'no_reg'])->toArray();
    $maxRawat = \App\Models\RegPeriksa::where('tgl_registrasi', date('Y-m-d'))->max('no_rawat');
    $maxReg = \App\Models\RegPeriksa::where('tgl_registrasi', date('Y-m-d'))->max('no_reg');
    return ['rows' => $rows, 'max_rawat' => $maxRawat, 'max_reg' => $maxReg, 'count' => count($rows)];
});
