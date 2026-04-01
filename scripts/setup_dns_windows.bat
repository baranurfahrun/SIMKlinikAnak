@echo off
setlocal

:: --- SEMAK KEIZINAN ADMINISTRATOR ---
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo.
    echo [ERROR] Sila jalankan skrip ini sebagai ADMINISTRATOR!
    echo (Klik kanan fail ini ^> Run as Administrator)
    echo.
    pause
    exit /b
)

echo ============================================================
echo           SETUP LOCAL DOMAIN SIMKLINIK (WINDOWS)
echo ============================================================
echo.

:: --- MASUKKAN IP SERVER ---
set /p SERVER_IP="Masukkan IP Server (Default 127.0.0.1): "
if "%SERVER_IP%"=="" set SERVER_IP=127.0.0.1

:: --- LOKASI FAIL HOSTS ---
set HOSTS_FILE=%SystemRoot%\System32\drivers\etc\hosts
set DOMAIN_NAME=simklinikanak

:: --- SEMAK JIKA DOMAIN SUDAH ADA ---
findstr /C:"%DOMAIN_NAME%" "%HOSTS_FILE%" >nul
if %errorLevel% equ 0 (
    echo [INFO] Domain %DOMAIN_NAME% sudah ada. Mengemas kini alamat IP...
    :: Padam baris lama jika ada (cara kasar menggunakan temporary file)
    findstr /V /C:"%DOMAIN_NAME%" "%HOSTS_FILE%" > "%TEMP%\hosts_new"
    move /Y "%TEMP%\hosts_new" "%HOSTS_FILE%" >nul
) else (
    echo [INFO] Menambah domain %DOMAIN_NAME% baharu...
)

:: --- TAMBAH BARIS BARU KE FAIL HOSTS ---
echo. >> "%HOSTS_FILE%"
echo %SERVER_IP%    %DOMAIN_NAME% >> "%HOSTS_FILE%"

echo.
echo ============================================================
echo           ✅ SETUP DOMAIN SELESAI ✅
echo ============================================================
echo DOMAIN AKTIF: http://%DOMAIN_NAME%
echo IP TUJUAN   : %SERVER_IP%
echo ============================================================
echo.
echo ARAHAN: Buka browser dan taip http://%DOMAIN_NAME%
echo.
pause
