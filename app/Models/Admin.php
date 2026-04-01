<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    protected $table = 'admin';
    protected $primaryKey = 'usere';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;
    protected $appends = ['nama', 'role'];

    protected $fillable = [
        'usere',
        'passworde',
        'nama',
    ];

    protected $hidden = [
        'passworde',
    ];

    // Mengarahkan Laravel untuk menggunakan kolom passworde sebagai password
    public function getAuthPassword()
    {
        return $this->passworde;
    }

    public function getNamaAttribute()
    {
        if (isset($this->attributes['nama']) && $this->attributes['nama']) {
            return $this->attributes['nama'];
        }
        $decrypted = \App\Helpers\SIKCrypt::decrypt($this->usere);
        return $decrypted == 'admin' ? 'Super Admin' : ucfirst($decrypted);
    }

    public function getRoleAttribute()
    {
        return 'admin';
    }
}
