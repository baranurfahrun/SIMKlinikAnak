<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TarifTindakan extends Model
{
    use HasFactory;

    protected $table = 'tarif_tindakan';
    protected $fillable = ['nama_tindakan', 'tarif'];
}
