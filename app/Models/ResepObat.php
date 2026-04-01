<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResepObat extends Model
{
    protected $table = 'resep_obat';
    protected $primaryKey = 'no_resep';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'no_resep',
        'tgl_perawatan',
        'jam_perawatan',
        'no_rawat',
        'kd_dokter',
        'tgl_penyerahan',
        'jam_penyerahan'
    ];

    public function detail()
    {
        return $this->hasMany(ResepDokter::class, 'no_resep', 'no_resep');
    }

    public function registrasi()
    {
        return $this->belongsTo(RegPeriksa::class, 'no_rawat', 'no_rawat');
    }

    public function dokter()
    {
        return $this->belongsTo(Dokter::class, 'kd_dokter', 'kd_dokter');
    }

    public function pasien()
    {
        return $this->hasOneThrough(
            Pasien::class,
            RegPeriksa::class,
            'no_rawat', // Foreign key on RegPeriksa table...
            'no_rkm_medis', // Foreign key on Pasien table...
            'no_rawat', // Local key on ResepObat table...
            'no_rkm_medis' // Local key on RegPeriksa table...
        );
    }
}
