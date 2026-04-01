@echo off
:: --- SKRIP AUTO-RUNNER + PENGINSTALL DEPENDENSI SIMKLINIK (WINDOWS) ---
title Menjalankan Aplikasi SIMKlinik

:: Meminta Hak Admin (Dibutuhkan untuk Instalasi Winget)
net session >nul 2>&1
if %errorLevel% neq 0 goto ELEVATE_ADMIN
goto ADMIN_OK

:ELEVATE_ADMIN
echo - Meminta akses Administrator untuk izin Instalasi Otomatis...
powershell -Command "Start-Process '%~dpnx0' -Verb RunAs"
exit /b

:ADMIN_OK
echo ==================================================
echo       🚀 MEMULAI APLIKASI SIMKLINIK 🚀           
echo ==================================================
echo.

:: 1. Deteksi dan Install XAMPP (PHP, MySQL)
if exist "C:\xampp\php\php.exe" set "PATH=%PATH%;C:\xampp\php"
where php >nul 2>nul
if %ERRORLEVEL% equ 0 goto CHECK_NODE

echo - PHP/XAMPP belum terpasang. Mengunduh dan Menginstal XAMPP otomatis...
winget install -e --id ApacheFriends.XAMPP --silent --accept-package-agreements --accept-source-agreements
set "PATH=%PATH%;C:\xampp\php"

:CHECK_NODE
:: 2. Deteksi dan Install Node.js (NPM)
where npm >nul 2>nul
if %ERRORLEVEL% equ 0 goto CHECK_COMPOSER

echo - Node.js belum terpasang. Mengunduh dan Menginstal Node.js otomatis...
winget install -e --id OpenJS.NodeJS --silent --accept-package-agreements --accept-source-agreements
set "PATH=%PATH%;C:\Program Files\nodejs"

:CHECK_COMPOSER
:: 3. Menggunakan composer.phar internal
goto CHECK_ROOT

:CHECK_ROOT
:: 4. Auto-Start XAMPP (Jika ada)
if exist "C:\xampp\xampp_start.exe" (
    echo - Menyalakan Apache dan MySQL secara otomatis...
    cd /d C:\xampp
    start /B "" "xampp_start.exe"
    timeout /t 3 /nobreak >nul
)

:: 5. Masuk ke root directory project
cd /d "%~dp0\.."

:: 6. Otomatisasi Instalasi Depedensi
if exist "vendor" goto CHECK_ENV
echo - [PERTAMA KALI] Memasang Paket Backend (Composer)...

if exist "composer.phar" goto USE_PHAR
call composer install --no-interaction
goto CHECK_ENV

:USE_PHAR
call php composer.phar install --no-interaction

:CHECK_ENV
if exist ".env" goto CHECK_NPM
echo - [PERTAMA KALI] Membuat file konfigurasi .env...
copy .env.example .env
call php artisan key:generate

:CHECK_NPM
if exist "node_modules" goto START_SERVER
echo - [PERTAMA KALI] Memasang Paket Frontend (NPM)...
call npm install
echo - Merakit aset visual...
call npm run prod

:START_SERVER
echo.
echo ==================================================
echo - Menjalankan Server Backend (Inertia/Laravel)
start /B php artisan serve --host=127.0.0.1 --port=8000

echo - Membuka Aplikasi di Browser...
timeout /t 3 /nobreak >nul
start http://127.0.0.1:8000/login

echo.
echo ==================================================
echo   ✅ APLIKASI BERHASIL DIJALANKAN (Port 8000)      
echo   Jangan tutup jendela ini saat aplikasi dipakai!  
echo ==================================================
echo.

pause
