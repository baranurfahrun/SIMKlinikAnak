<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $table = 'settings';
    protected $primaryKey = 'nama';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'nama',
        'nilai'
    ];

    public static function get($key, $default = null)
    {
        $setting = self::find($key);
        return $setting ? $setting->nilai : $default;
    }

    public static function set($key, $value)
    {
        return self::updateOrCreate(
            ['nama' => $key],
            ['nilai' => $value]
        );
    }
}
