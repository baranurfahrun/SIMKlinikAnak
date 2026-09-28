<?php

$version = 'V.01.00'; // Default fallback

try {
    // Ambil jumlah commit dari Git untuk dijadikan auto-increment versi
    if (is_dir(base_path('.git'))) {
        $commitCount = trim(shell_exec('git rev-list --count HEAD 2>nul'));
        if (is_numeric($commitCount)) {
            // Contoh format: V.01.23 (dimana 23 adalah jumlah update/commit)
            $version = 'V.01.' . str_pad($commitCount, 2, '0', STR_PAD_LEFT);
        }
    }
} catch (\Exception $e) {
    // Abaikan jika git tidak tersedia
}

return [
    /*
    |--------------------------------------------------------------------------
    | Versi Aplikasi SIMKlinik Anak
    |--------------------------------------------------------------------------
    | Versi ini sekarang OTOMATIS mendeteksi update dari GitHub (Git Commit).
    | Setiap kali start_simklinik.bat mendownload update, versi ini akan bertambah.
    */
    'version' => $version,
    'release_date' => date('Y-m-d'),
];
