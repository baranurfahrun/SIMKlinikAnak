<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StokOpname extends Model
{
    protected $table = 'stok_opname';
    protected $primaryKey = 'no_opname';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'no_opname',
        'tgl_opname',
        'kode_brng',
        'stok_sistem',
        'stok_fisik',
        'selisih',
        'keterangan'
    ];

    public function barang()
    {
        return $this->belongsTo(DataBarang::class, 'kode_brng', 'kode_brng');
    }
}
