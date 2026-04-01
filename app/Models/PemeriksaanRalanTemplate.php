<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PemeriksaanRalanTemplate extends Model
{
    protected $table = 'pemeriksaan_ralan_template';

    protected $fillable = [
        'nip',
        'keluhan',
        'pemeriksaan',
        'penilaian',
        'tindak_lanjut'
    ];
}
