@echo off
setlocal enabledelayedexpansion

:: 1. Verifikasi Hak Admin
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo.
    echo [ERROR] SKRIP INI MEMBUTUHKAN HAK AKSES ADMINISTRATOR!
    echo ========================================================
    echo Sila Klik Kanan fail ini -> Pilih 'Run as Administrator'
    echo ========================================================
    echo.
    pause
    exit /b
)

:: 2. Masuk ke Root Folder
pushd "%~dp0.."

echo ==========================================================
echo       [ SIMKLINIK INTEGRITY SHIELD - ACTIVE ]
echo ==========================================================
echo.

:: 3. Bunker Rahasia (Hiding Vital Files)
echo - Mengamankan file keamanan sistem...
attrib +h +s ".git" /d >nul 2>&1
attrib +h +s ".env" >nul 2>&1
attrib +h +s "gen_hash.php" >nul 2>&1

:: 4. Cek Update dari GitHub
echo - Memeriksa pembaruan sistem di GitHub...
where git >nul 2>nul
if %errorLevel% equ 0 (
    git config --global --add safe.directory "%cd%" >nul 2>&1
    git fetch origin --quiet >nul 2>&1
    
    if %errorLevel% equ 0 (
        :: Deteksi Branch Utama (master atau main)
        set "BRANCH_NAME=master"
        git rev-parse --verify origin/master >nul 2>&1
        if %errorLevel% neq 0 set "BRANCH_NAME=main"
        
        for /f "tokens=*" %%a in ('git rev-parse HEAD') do set L_HASH=%%a
        for /f "tokens=*" %%b in ('git rev-parse origin/!BRANCH_NAME!') do set R_HASH=%%b
        
        if not "!L_HASH!"=="!R_HASH!" (
            echo [UPDATE] Ada versi baru di branch !BRANCH_NAME!! Sinkronisasi...
            git reset --hard origin/!BRANCH_NAME! --quiet
            git pull origin !BRANCH_NAME! --quiet
            echo [SUCCESS] Sistem Berhasil Diperbarui.
        ) else (
            echo [INFO] Sistem sudah menggunakan kode terbaru.
        )
    )
)

:: 5. Jalankan Database XAMPP
if exist "C:\xampp\xampp_start.exe" (
    pushd C:\xampp
    start /B "" "xampp_start.exe" >nul 2>&1
    popd
)

:: 6. Jalankan Server Utama
echo.
echo ==========================================================
echo   STATUS: ONLINE [127.0.0.1:8000]
echo   Silakan gunakan Ikon PWA di Desktop untuk Masuk.
echo   Jangan tutup jendela ini saat aplikasi digunakan.
echo ==========================================================
echo.
php artisan serve --host=127.0.0.1 --port=8000

pause
popd
exit
