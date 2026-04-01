<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CaptchaController extends Controller
{
    public function generate()
    {
        // 1. Generate Random String (Tanpa 0, 1, I, O yang membingungkan)
        $characters = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
        $code = '';
        for ($i = 0; $i < 5; $i++) {
            $code .= $characters[rand(0, strlen($characters) - 1)];
        }

        // 2. Simpan ke Sesi Laravel secara aman
        session(['captcha_code' => strtoupper($code)]);

        // 3. Buat Canvas Gambar via GD Library
        $width = 160;
        $height = 45;
        $image = imagecreatetruecolor($width, $height);

        // Warna Aesthetic Menyesuaikan Tema
        $bg = imagecolorallocate($image, 255, 255, 255);
        $text = imagecolorallocate($image, 15, 23, 42);   // Warna Slate-800
        $line = imagecolorallocate($image, 14, 165, 233);  // Warna Sky-500 (Garis)
        $dot = imagecolorallocate($image, 148, 163, 184); // Warna Slate-400 (Dots)

        // Fill background
        imagefilledrectangle($image, 0, 0, $width, $height, $bg);

        // Tambah Garis Acak (Noise)
        for ($i = 0; $i < 4; $i++) {
            imageline($image, 0, rand(0, $height), $width, rand(0, $height), $line);
        }

        // Tambah Titik Acak (Dots Noise)
        for ($i = 0; $i < 200; $i++) {
            imagesetpixel($image, rand(0, $width), rand(0, $height), $dot);
        }

        // Cetak Karakter dengan Posisi Acak Sedikit
        $x = 25;
        for ($i = 0; $i < strlen($code); $i++) {
            imagestring($image, 5, $x, rand(12, 18), $code[$i], $text);
            $x += 25;
        }

        // 4. Output Stream Response
        ob_start();
        imagepng($image);
        $data = ob_get_clean();
        imagedestroy($image);

        return response($data)
            ->header('Content-Type', 'image/png')
            ->header('Cache-Control', 'no-cache, must-revalidate');
    }
}
