<?php
// === SIMKLINIK INTEGRITY MANIFEST ===
// SISTEM PROTEKSI ASSET DIGITAL

$integrity_hashes = [
    'resources/js/Layouts/AppLayout.jsx' => 'c983c44d992e78112493d7f08689c3a1a677acde',
    'app/Http/Middleware/HandleInertiaRequests.php' => '824a262c97a2720103244edcbd3271027c9caaf7'
];

$root_dir = dirname(dirname(dirname(__DIR__))); // Beranjak dari app/Http/Middleware ke Root

// Simpan status keamanan ke Global scope agar bisa dibaca Inertia (Dashboard)
$GLOBALS['integrity_status'] = [];

$is_bypass_route = (isset($_SERVER['REQUEST_URI']) && (strpos($_SERVER['REQUEST_URI'], '/pengaturan/sistem') !== false || strpos($_SERVER['REQUEST_URI'], 'generate_hash.php') !== false));

foreach ($integrity_hashes as $file => $expected_hash) {
    $real_path = $root_dir . DIRECTORY_SEPARATOR . $file;
    $status = "Protected"; // Default

    if ($expected_hash !== '0000000000000000000000000000000000000000') {
        if (file_exists($real_path)) {
            // LOGIKA AUDIT 24 JAM
            $session_key = 'integrity_checked_at_' . md5($file);
            $last_checked = session()->get($session_key, 0);
            $is_need_check = (time() - $last_checked > 86400);

            if (!$is_need_check) {
                // Lewati sha1_file (Menu Instan)
                $status = "Protected (Cached)";
            } else {
                // Jalankan Audit Hash (Cuma sekali sehari)
                if (sha1_file($real_path) !== $expected_hash) {
                    $status = "Tampered";
                    
                    if (!$is_bypass_route) {
                        die("
                        <!DOCTYPE html>
                        <html lang='id'>
                        <head>
                            <meta charset='UTF-8'>
                            <title>Security Alert | SIMKlinik</title>
                            <link href='https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Outfit:wght@800&display=swap' rel='stylesheet'>
                            <style>
                                body { background: #f8fafc; font-family: 'Inter', sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                                .card { background: white; border-radius: 24px; padding: 40px; box-shadow: 0 10px 40px rgba(239, 68, 68, 0.05); text-align: center; border: 1px solid #fee2e2; max-width: 450px; width: 90%; }
                                .icon { font-size: 48px; margin-bottom: 20px; }
                                h2 { font-family: 'Outfit', sans-serif; font-weight: 800; color: #ef4444; margin-bottom: 12px; letter-spacing: -0.02em; }
                                p { color: #64748b; font-size: 14px; margin-bottom: 24px; line-height: 1.5; }
                                .timer { color: #3b82f6; font-size: 16px; font-weight: 700; font-family: 'Outfit', sans-serif; background: #eff6ff; padding: 10px; border-radius: 12px; display: inline-block; }
                            </style>
                        </head>
                        <body>
                            <div class='card'>
                                <div class='icon'>🛡️</div>
                                <h2>Security Alert</h2>
                                <p>File <b>" . basename($file) . "</b> has been modified/tampered with.<br>Sistem mendeteksi adanya perubahan tidak sah.</p>
                                <div class='timer'>Mengalihkan ke Konsol dalam <span id='countdown'>5</span> detik...</div>
                            </div>
                            <script>
                                let count = 5;
                                const cd = setInterval(() => {
                                    count--;
                                    document.getElementById('countdown').innerText = count;
                                    if (count <= 0) {
                                        clearInterval(cd);
                                        window.location.href = '/generate_hash.php';
                                    }
                                }, 1000);
                            </script>
                        </body>
                        </html>
                        ");
                    }
                } else {
                    // Audit Sukses! Catat waktu pengecekan untuk 24 jam kedepan
                    session()->put($session_key, time());
                }
            } // end is_need_check
        } // end file_exists
    } // end expected_hash
    $GLOBALS['integrity_status'][basename($file)] = $status;
} // end foreach
?>
