<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dokter extends Model
{
    protected $table = 'dokter';
    protected $primaryKey = 'kd_dokter';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'kd_dokter', 'nm_dokter', 'jk', 'tmp_lahir', 'tgl_lahir', 
        'gol_darah', 'agama', 'alamat', 'no_telp', 'stts_nikah', 
        'alumni', 'no_sip'
    ];
}
