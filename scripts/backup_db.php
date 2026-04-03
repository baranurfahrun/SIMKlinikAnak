<?php
/**
 * AUTO BACKUP DATABASE SIMKLINIK
 * Portable & Secure (Read from .env)
 */

$rootDir = dirname(__DIR__);
$envFile = $rootDir . '/.env';

echo "----------------------------------------------------------\n";
echo "   [ DATABASE BACKUP SYSTEM ]\n";
echo "----------------------------------------------------------\n";

if (!file_exists($envFile)) {
    die("Error: File .env tidak ditemukan di {$rootDir}\n");
}

// 1. Parse .env secara manual (Tanpa library Laravel)
$envData = [];
$lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
foreach ($lines as $line) {
    if (strpos(trim($line), '#') === 0) continue;
    if (strpos($line, '=') === false) continue;
    list($name, $value) = explode('=', $line, 2);
    $envData[trim($name)] = trim($value);
}

$dbName = $envData['DB_DATABASE'] ?? 'sim_klinik_anak';
$dbUser = $envData['DB_USERNAME'] ?? 'root';
$dbPass = $envData['DB_PASSWORD'] ?? '';
$dbHost = $envData['DB_HOST'] ?? '127.0.0.1';

// 2. Tentukan Folder Backup (Portable)
$backupDir = $rootDir . '/backups';
if (!is_dir($backupDir)) {
    mkdir($backupDir, 0777, true);
    echo "- Membuat folder backup baru...\n";
}

$date = date('Y-m-d_H-i-s');
$fileName = "backup_{$dbName}_{$date}.sql";
$filePath = $backupDir . '/' . $fileName;

// 3. Lokasi mysqldump (XAMPP Default)
$mysqldump = "C:\\xampp\\mysql\\bin\\mysqldump.exe";

if (!file_exists($mysqldump)) {
    echo "Warning: mysqldump.exe tidak ditemukan di {$mysqldump}\n";
    echo "Mencoba pakai perintah sistem...\n";
    $mysqldump = "mysqldump"; // Jika sudah masuk PATH
}

// 4. Bangun Perintah Backup
if (empty($dbPass)) {
    $command = sprintf('"%s" --user="%s" --host="%s" %s > "%s"', $mysqldump, $dbUser, $dbHost, $dbName, $filePath);
} else {
    $command = sprintf('"%s" --user="%s" --password="%s" --host="%s" %s > "%s"', $mysqldump, $dbUser, $dbPass, $dbHost, $dbName, $filePath);
}

echo "- Sedang mencadangkan database: {$dbName}\n";
echo "- Lokasi: {$filePath}\n";

system($command, $resultCode);

if ($resultCode === 0) {
    echo ">>> BERHASIL: Database telah diamankan.\n";
} else {
    echo ">>> GAGAL: Terjadi kesalahan saat backup (Code: {$resultCode})\n";
}

// 5. HOUSEKEEPING (Hanya simpan 30 backup terakhir)
$files = glob($backupDir . '/*.sql');
if (count($files) > 30) {
    echo "- Membersihkan backup lama (Batas 30 file)...\n";
    usort($files, function($a, $b) {
        return filemtime($a) - filemtime($b);
    });
    $toDelete = count($files) - 30;
    for ($i = 0; $i < $toDelete; $i++) {
        unlink($files[$i]);
    }
}
echo "----------------------------------------------------------\n";
