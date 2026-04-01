#!/bin/bash

# --- SKRIP SETUP LOCAL DNS (DNSMASQ) @ UBUNTU SERVER ---
# Memungkinkan akses aplikasi menggunakan nama: http://simklinik

echo "=============== MULAI SETUP LOCAL DNS ==============="

# 1. Pastikan IP Server Statis (Pengingat)
echo "-> Pastikan IP Server Anda statis (Contoh: 192.168.1.100)"
read -p "Masukkan IP Address Server ini actual (Contoh 192.168.1.100): " SERVER_IP

if [ -z "$SERVER_IP" ]; then
    echo "[ERROR] IP tidak boleh kosong!"
    exit 1
fi

# 2. Instalasi Dnsmasq
echo "-> Mengunduh dan memasang dnsmasq..."
sudo apt update -y
sudo apt install dnsmasq -y

# 3. Matikan Systemd-resolved untuk mencegah Port 53 Conflict
echo "-> Mengkonfigurasi systemd-resolved resolver..."
sudo sed -i 's/#DNSStubListener=yes/DNSStubListener=no/g' /etc/systemd/resolved.conf
sudo systemctl restart systemd-resolved

# 4. Tambahkan Aturan DNS Lokal di dnsmasq
echo "-> Menghapus konfigurasi lama..."
sudo rm -f /etc/dnsmasq.d/simklinik.conf

echo "-> Menulis konfigurasi dnsmasq baru..."
sudo tee /etc/dnsmasq.d/simklinik.conf > /dev/null <<EOF
# Teruskan request internet ke Google DNS
server=8.8.8.8
server=8.8.4.4

# Domain Lokal SIMKlinik
address=/simklinikanak/$SERVER_IP
EOF

# 5. Restart DNSMasq
echo "-> Memulai ulang layanan DNS..."
sudo systemctl restart dnsmasq
sudo systemctl enable dnsmasq

echo "============================================================"
echo "          ✅ SETUP LOCAL DNS SELESAI ✅                    "
echo "============================================================"
echo "DOMAIN AKTIF: http://simklinik"
echo "IP TUJUAN   : $SERVER_IP"
echo "============================================================"
echo "LANGKAH LANJUTAN (SANGAT PENTING):"
echo "1. Buka halaman pengaturan Router IndiHome Anda."
echo "2. Pada menu DHCP/LAN, ganti 'Primary DNS' menjadi: $SERVER_IP"
echo "============================================================"
