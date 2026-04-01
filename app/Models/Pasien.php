<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pasien extends Model
{
    protected $table = 'pasien';
    protected $primaryKey = 'no_rkm_medis';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'no_rkm_medis',
        'nm_pasien',
        'nik',
        'jk',
        'tmp_lahir',
        'tgl_lahir',
        'nm_ibu',
        'no_tlp',
        'alamat',
        'tgl_daftar',
        'agama',
        'pekerjaan',
        'stts_nikah',
        'gol_darah',
        'pendidikan',
        'no_peserta',
        'email',
        'suku_bangsa',
        'bahasa_pasien',
        'cacat_fisik',
        'kelurahan',
        'kecamatan',
        'kabupaten',
        'propinsi'
    ];
}
