@echo off
title SIMKLINIK MONITOR
:: [ AUTO-RUNNER SIMKLINIK LOKAL - OPSI 1 ]

:: 1. Tentukan Root Folder
pushd "%~dp0.."

echo ==========================================================
echo       [ SIMKLINIK INTEGRITY SHIELD - ACTIVE ]
echo ==========================================================
echo.
echo - Mengaktifkan proteksi file sistem...
attrib +h +s ".git" /d >nul 2>&1
attrib +h +s ".env" >nul 2>&1

:: Cek Update dari GitHub secara otomatis untuk sinkronisasi Versi
echo - Memeriksa pembaruan sistem dan versi...
where git >nul 2>nul
if %errorLevel% equ 0 (
    git fetch origin --quiet >nul 2>&1
    if %errorLevel% equ 0 (
        git pull origin master --quiet >nul 2>&1
    )
    for /f "tokens=*" %%a in ('git rev-list --count HEAD') do set COMMIT_COUNT=%%a
)
if not defined COMMIT_COUNT set COMMIT_COUNT=00

echo.
echo ==========================================================
echo   STATUS: ONLINE [0.0.0.0:8000]
echo   VERSI SAAT INI: V.01.%COMMIT_COUNT%
echo   Aplikasi sudah bisa diakses di http://localhost:8000
echo.
echo   [!] JANGAN TUTUP JENDELA INI [!]
echo   Jendela ini berfungsi untuk auto-backup setiap 30 menit.
echo ==========================================================
echo.

:: 2. Jalankan PHP Server di background (di jendela yang sama)
start /B C:\xampp\php\php.exe -S 0.0.0.0:8000 -t public >nul 2>&1

:: 3. Jalankan Auto-Backup Loop di foreground
:backup_loop
echo [%time:~0,8%] Melakukan backup database rutin...
C:\xampp\php\php.exe scripts\backup_db.php

echo [%time:~0,8%] Backup selesai. Menunggu 30 menit untuk backup selanjutnya...
timeout /t 1800 /nobreak

goto backup_loop
