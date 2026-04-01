<?php
/**
 * SIMKlinik Integrity Console (V.2026.03)
 * High-Security Hash Generator for SIMKlinik Digital Assets
 * Replicated from BexMedia Concept
 */
session_start();


if (isset($_SESSION['authorized_simklinik'])) {
    if (!isset($_SESSION['session_created_at'])) {
        $_SESSION['session_created_at'] = time();
    }
    else if (time() - $_SESSION['session_created_at'] > 3600) {
        
        session_unset();
        session_destroy();
        header("Location: generate_hash.php");
        exit;
    }
}


$master_password = base64_decode('UHVnYWx1YnVudG9AMjAyNQ==');
$root_dir = dirname(__DIR__); 
$integrity_file = $root_dir . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Http' . DIRECTORY_SEPARATOR . 'Middleware' . DIRECTORY_SEPARATOR . 'check_integrity.php';


if (!isset($_SESSION['authorized_simklinik'])) {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['password'])) {
        if ($_POST['password'] === $master_password) {
            $_SESSION['authorized_simklinik'] = true;
            header("Location: generate_hash.php");
            exit;
        }
        else {
            $error_login = "Password keamanan ditolak.";
        }
    }
    else {
        echo '
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>SIMKlinik | Integrity Auth</title>
            
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.2/css/bootstrap.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Outfit:wght@700;800&display=swap" rel="stylesheet">
            <style>
                body { 
                    background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 50%, #BAE6FD 100%);
                    background-attachment: fixed;
                    font-family: \'Inter\', sans-serif; 
                    height: 100vh; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    margin: 0;
                }
                .auth-card { 
                    background: rgba(255, 255, 255, 0.7); 
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.5);
                    border-radius: 32px; 
                    padding: 50px; 
                    box-shadow: 0 20px 60px rgba(0, 50, 150, 0.08); 
                    width: 100%; 
                    max-width: 420px; 
                    text-align: center; 
                }
                .auth-icon { 
                    background: linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%);
                    color: white; 
                    width: 70px; 
                    height: 70px; 
                    border-radius: 20px; 
                    display: inline-flex; 
                    align-items: center; 
                    justify-content: center; 
                    font-size: 28px; 
                    margin-bottom: 24px; 
                    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
                }
                .auth-card h4 {
                    font-family: \'Outfit\', sans-serif;
                    font-weight: 800;
                    color: #0F172A;
                    letter-spacing: -0.02em;
                }
                .btn-auth { 
                    background: #3B82F6; 
                    border: none; 
                    border-radius: 16px; 
                    padding: 14px; 
                    font-weight: 700; 
                    font-family: \'Outfit\', sans-serif;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
                    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
                }
                .btn-auth:hover { 
                    background: #2563EB; 
                    transform: translateY(-3px); 
                    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
                }
                .form-control {
                    border-radius: 14px; 
                    padding: 14px; 
                    background: rgba(241, 245, 249, 0.8) !important; 
                    border: 1px solid transparent;
                    transition: all 0.3s ease;
                }
                .form-control:focus {
                    background: #fff !important;
                    border-color: #3B82F6;
                    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
                }
            </style>
        </head>
        <body>
            <div class="auth-card">
                <div class="auth-icon"><i class="fas fa-shield-alt"></i></div>
                <h4>Integrity Console</h4>
                <p class="text-muted mb-4" style="font-size: 15px;">Administrator verification required for SIMKlinik Security systems.</p>
                
                <form method="POST">
                    <div class="form-group mb-4">
                        <input type="password" name="password" class="form-control text-center" placeholder="Security Master Password" required autofocus>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block btn-auth">Buka Konsol Keamanan</button>
                    ' . (isset($error_login) ? '<p class="text-danger mt-3 font-weight-bold">' . $error_login . '</p>' : '') . '
                </form>
                
                <p class="mt-5 text-muted" style="font-size: 12px; font-weight: 500;">&copy; 2026 Admin • Premium Security Guard</p>
            </div>
        </body>
        </html>';
        exit;
    }
}


if (isset($_GET['logout'])) {
    unset($_SESSION['authorized_simklinik']);
    header("Location: generate_hash.php");
    exit;
}

$status_msg = "";
$error_msg = "";


if (isset($_POST['generate_hash'])) {
    $files_to_hash = [
        'resources/js/Layouts/AppLayout.jsx',
        'app/Http/Middleware/HandleInertiaRequests.php'
    ];
    $success_count = 0;

    if (!file_exists($integrity_file)) {
        $error_msg = "File check_integrity.php tidak ditemukan di $integrity_file !";
    }
    else {
        $content = file_get_contents($integrity_file);
        $new_hashes = [];

        foreach ($files_to_hash as $file) {
            $real_path = $root_dir . DIRECTORY_SEPARATOR . $file;
            if (file_exists($real_path)) {
                $hash = sha1_file($real_path);
                $new_hashes[$file] = $hash;

                // Regex untuk update array di check_integrity.php
                // Pattern: '$file' => '...'
                $safe_file = preg_quote($file, '/');
                $pattern = "/'$safe_file'\s*=>\s*'[a-f0-9]{40}'/";
                $replacement = "'$file' => '$hash'";
                $content = preg_replace($pattern, $replacement, $content);
                $success_count++;
            }
        }

        // Simpan perubahan ke check_integrity.php
        if (file_put_contents($integrity_file, $content)) {
            $status_msg = "Berhasil mensinkronkan $success_count file keamanan.";
        }
        else {
            $error_msg = "Gagal menulis ke file check_integrity.php. Periksa izin file (CHMOD).";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>SIMKlinik | Integrity Console</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Outfit:wght@700;800&display=swap"
        rel="stylesheet">
    <style>
        body {
            background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 50%, #BAE6FD 100%);
            background-attachment: fixed;
            font-family: 'Inter', sans-serif;
            padding-top: 50px;
            min-height: 100vh;
        }

        .console-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            border-radius: 32px;
            box-shadow: 0 20px 60px rgba(0, 50, 150, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.5);
            overflow: hidden;
        }

        .console-header {
            background: #0f172a;
            color: white;
            padding: 25px 35px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .console-header h5 {
            font-family: 'Outfit', sans-serif;
            font-weight: 700;
            letter-spacing: -0.01em;
        }

        .btn-sync {
            background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
            border: none;
            border-radius: 18px;
            padding: 16px 35px;
            font-weight: 700;
            font-family: 'Outfit', sans-serif;
            box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
            transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .btn-sync:hover {
            background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
            transform: translateY(-4px);
            box-shadow: 0 15px 35px rgba(59, 130, 246, 0.4);
            color: white;
        }

        code {
            background: rgba(59, 130, 246, 0.1);
            color: #2563EB;
            padding: 4px 8px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 0.9em;
        }

        .file-item {
            background: white;
            padding: 20px;
            border-radius: 18px;
            margin-bottom: 12px;
            border: 1px solid #f1f5f9;
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: 0.3s;
        }

        .file-item:hover {
            transform: scale(1.02);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.03);
        }
    </style>
</head>

<body>

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-9">
                <div class="card console-card">
                    <div class="console-header">
                        <h5 class="mb-0"><i class="fas fa-shield-halved mr-2"></i> SIMKlinik Performance Guard</h5>
                        <a href="?logout=1" class="btn btn-sm btn-outline-light border-0 px-3"
                            style="border-radius: 8px;">
                            <i class="fas fa-power-off mr-1"></i> Logout
                        </a>
                    </div>
                    <div class="card-body p-5">

                        <?php if ($status_msg): ?>
                        <div class="alert alert-success border-0 rounded-xl py-3 mb-4 shadow-sm"
                            style="background: #ecfdf5; color: #065f46;">
                            <i class="fas fa-check-circle mr-2"></i>
                            <?= $status_msg?>
                        </div>
                        <?php
endif; ?>

                        <?php if ($error_msg): ?>
                        <div class="alert alert-danger border-0 rounded-xl py-3 mb-4 shadow-sm">
                            <i class="fas fa-exclamation-triangle mr-2"></i>
                            <?= $error_msg?>
                        </div>
                        <?php
endif; ?>

                        <div class="mb-5">
                            <h3 class="font-weight-bold color-dark">Security Synchronization</h3>
                            <p class="text-muted">Generate new security hashes for core assets to maintain high-fidelity
                                integrity within the SIMKlinik ecosystem.</p>
                        </div>

                        <div class="row mb-5">
                            <div class="col-md-6">
                                <div class="file-item">
                                    <div>
                                        <span class="d-block font-weight-bold">AppLayout.jsx</span>
                                        <small class="text-muted">Core Layout Framework</small>
                                    </div>
                                    <span class="badge badge-soft-primary px-3 py-2"
                                        style="background:#e0f2fe; color:#0369a1; border-radius:8px;">Protected</span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="file-item">
                                    <div>
                                        <span class="d-block font-weight-bold">HandleInertiaRequests.php</span>
                                        <small class="text-muted">Global State Controller</small>
                                    </div>
                                    <span class="badge badge-soft-primary px-3 py-2"
                                        style="background:#e0f2fe; color:#0369a1; border-radius:8px;">Protected</span>
                                </div>
                            </div>
                        </div>

                        <form method="POST" class="text-center">
                            <button type="submit" name="generate_hash" class="btn btn-primary btn-sync">
                                <i class="fas fa-sync-alt mr-2"></i> Sync Security Manifest
                            </button>
                        </form>

                    </div>
                    <div class="card-footer bg-white border-0 py-4 text-center">
                        <p class="mb-0 text-muted small">System Status: <span class="text-success font-weight-bold"><i
                                    class="fas fa-circle x-small"></i> Online & Secure</span> | Sync Engine V.2.1</p>
                    </div>
                </div>

                <p class="text-center mt-5 text-muted" style="font-size: 13px;">Enterprise Security Managed by Premium
                    Security Guard</p>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.2/js/bootstrap.bundle.min.js"></script>
    <script>
        if (window.history.replaceState) {
            window.history.replaceState(null, null, window.location.href);
        }
    </script>
</body>

</html>