<?php

namespace App\Helpers;

class SIKCrypt
{
    // Kunci rahasia untuk enkripsi (identik dengan standar Khanza jika ingin kompatibel)
    private static $key = 'windiartonugroho'; 

    public static function encrypt($value)
    {
        if (!$value) return null;
        
        $method = "AES-256-CBC";
        $secret_key = hash('sha256', self::$key);
        $secret_iv = substr(hash('sha256', self::$key), 0, 16);
        
        $output = openssl_encrypt($value, $method, $secret_key, 0, $secret_iv);
        return base64_encode($output);
    }

    public static function decrypt($value)
    {
        if (!$value) return null;
        
        $method = "AES-256-CBC";
        $secret_key = hash('sha256', self::$key);
        $secret_iv = substr(hash('sha256', self::$key), 0, 16);
        
        $output = openssl_decrypt(base64_decode($value), $method, $secret_key, 0, $secret_iv);
        return $output;
    }
}
