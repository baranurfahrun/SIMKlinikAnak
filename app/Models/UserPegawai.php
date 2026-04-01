<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class UserPegawai extends Authenticatable
{
    protected $table = 'user_pegawai';
    protected $primaryKey = 'id_user';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;
    protected $appends = ['nama', 'username', 'role'];

    protected $fillable = [
        'id_user',
        'password',
        'nik',
        'nama_pegawai',
        'jk',
        'tmp_lahir',
        'tgl_lahir',
        'alamat',
        'no_telp',
        'jabatan',
        'gol_darah',
        'agama',
        'stts_nikah',
        'alumni',
    ];

    protected $hidden = [
        'password',
    ];

    public function getAuthPassword()
    {
        return $this->password;
    }

    public function getUsernameAttribute()
    {
        return \App\Helpers\SIKCrypt::decrypt($this->id_user);
    }

    public function getNamaAttribute()
    {
        return $this->nama_pegawai ?: ucfirst($this->username);
    }

    public function getRoleAttribute()
    {
        return strtolower($this->jabatan ?: 'pegawai');
    }
}
