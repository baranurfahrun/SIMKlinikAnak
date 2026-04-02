@echo off
:: [ AUTO-RUNNER SIMKLINIK ]

:: 1. AUTO-ELEVASI ADMINISTRATOR (Mendukung Spasi pada Folder)
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo - Meminta izin Administrator...
    powershell -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
    exit /b
)

setlocal enabledelayedexpansion

:: 2. Tentukan Root Folder (Penting untuk folder berspasi)
pushd "%~dp0.."

echo ==========================================================
echo       [ SIMKLINIK INTEGRITY SHIELD - ACTIVE ]
echo ==========================================================
echo.

:: 3. Daftarkan PHP (XAMPP) ke Path sistem
if exist "C:\xampp\php\php.exe" set "PATH=%PATH%;C:\xampp\php"

:: 4. Bunker Rahasia (Hiding Vital Files)
echo - Mengaktifkan proteksi file sistem...
attrib +h +s ".git" /d >nul 2>&1
attrib +h +s ".env" >nul 2>&1
attrib +h +s "gen_hash.php" >nul 2>&1

:: 5. Cek Update dari GitHub
echo - Memeriksa pembaruan di GitHub...
where git >nul 2>nul
if %errorLevel% equ 0 (
    git config --global --add safe.directory "%cd%" >nul 2>&1
    git fetch origin --quiet
    
    if !errorLevel! equ 0 (
        set "BRANCH_NAME=master"
        git rev-parse --verify origin/master >nul 2>&1
        if !errorLevel! neq 0 set "BRANCH_NAME=main"
        
        for /f "tokens=*" %%a in ('git rev-parse HEAD') do set L_HASH=%%a
        for /f "tokens=*" %%b in ('git rev-parse origin/!BRANCH_NAME!') do set R_HASH=%%b
        
        if not "!L_HASH!"=="!R_HASH!" (
            echo [UPDATE] Versi baru ditemukan! Memulai Sinkronisasi dari GitHub...
            echo.
            git reset --hard origin/!BRANCH_NAME!
            git pull origin !BRANCH_NAME!
            echo.
            if !errorLevel! neq 0 (
                echo [ERROR] Gagal menarik update dari GitHub! Tolong cek akses internet atau password Git Anda.
                echo Silakan periksa tulisan error di atas.
                pause
            ) else (
                echo [OK] Update berhasil ditarik dengan sempurna!
            )
        ) else (
            echo [INFO] Sistem sudah up-to-date.
        )
    ) else (
        echo [WARNING] Gagal menghubungi GitHub. Pastikan internet jalan atau repositori terbuka.
    )
) else (
    echo [WARNING] Aplikasi GIT belum ter-install di Windows Anda! Fitur Auto-Update dimatikan.
)

:: 6. Jalankan Database XAMPP
if exist "C:\xampp\xampp_start.exe" (
    pushd C:\xampp
    start /B "" "xampp_start.exe" >nul 2>&1
    popd
)

:: 7. Jalankan Server Utama
echo.
echo ==========================================================
echo   STATUS: ONLINE [127.0.0.1:8000]
echo   Silakan gunakan Ikon PWA di Desktop Anda.
echo ==========================================================
echo.
php artisan serve --host=127.0.0.1 --port=8000

if %errorLevel% neq 0 pause
popd
exit
