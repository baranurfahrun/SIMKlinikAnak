#!/bin/bash

# --- SKRIP OTOMATISASI SETUP SERVER SIMKLINIK ---
# Target: Ubuntu Server (22.04 / 24.04 LTS)

echo "=============== MULAI SETUP SERVER SIMKLINIK ==============="

# 1. Update & Upgrade Sistem
echo "-> Memperbarui repository sistem..."
sudo apt update -y && sudo apt upgrade -y

# 2. Instalasi Web Server (Nginx) & Database (MySQL)
echo "-> Menginstal Nginx dan MySQL..."
sudo apt install nginx mysql-server -y

# 3. Instalasi PHP & Extensions (Versi 8.2)
echo "-> Menambahkan PPA PHP..."
sudo apt install software-properties-common -y
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update -y

echo "-> Menginstal PHP 8.2 dan ekstensi..."
sudo apt install php8.2 php8.2-fpm php8.2-mysql php8.2-mbstring php8.2-xml php8.2-curl php8.2-zip php8.2-gd php8.2-intl -y

# 4. Instalasi Tools Pendukung (Git, Composer, Node)
echo "-> Menginstal Composer..."
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

echo "-> Menginstal Node.js & NPM..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y

# 5. Konfigurasi Firewall (UFW)
echo "-> Membuka akses port Nginx (HTTP/HTTPS) dan SSH..."
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
echo "y" | sudo ufw enable

# 6. Otomatisasi Project-Level Setup
echo -e "\n-> [PROYEK] Memasang Dependensi Pendukung..."

PROJECT_PATH=$(pwd)

if [ ! -f "$PROJECT_PATH/.env" ]; then
    echo "-> Mengatur File Konfigurasi .env..."
    cp .env.example .env
    composer install --no-interaction
    php artisan key:generate
fi

if [ ! -d "$PROJECT_PATH/node_modules" ]; then
    echo "-> Memasang Paket Frontend (NPM)..."
    npm install
    npm run prod
fi

# 7. Memperbaiki Permission Storage Laravel
echo "-> Mengatur Permission Folder Storage..."
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache

echo "============================================================"
echo "          ✅ INSTALASI CORE SOFTWARE SELESAI ✅            "
echo "============================================================"
echo "Langkah berikutnya:"
echo "1. Pastikan isi '.env' di-sesuaikan (Database Name, User, Password)"
echo "2. Import database .sql ke MySQL"
echo "3. Restart Nginx menggunakan 'sudo systemctl restart nginx'"
echo "============================================================"
