<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PemeriksaanRalan extends Model
{
    protected $table = 'pemeriksaan_ralan';
    protected $primaryKey = 'no_rawat'; // Although composite, we use no_rawat as main identifier for relation
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'no_rawat',
        'tgl_pemeriksaan',
        'jam_pemeriksaan',
        'suhu_tubuh',
        'tensi',
        'nadi',
        'respirasi',
        'spo2',
        'tinggi',
        'berat',
        'lingkar_perut',
        'gcs',
        'kesadaran',
        'keluhan',
        'pemeriksaan',
        'penilaian',
        'tindak_lanjut',
        'alergi',
        'nip'
    ];

    public function regPeriksa()
    {
        return $this->belongsTo(RegPeriksa::class, 'no_rawat', 'no_rawat');
    }
}
