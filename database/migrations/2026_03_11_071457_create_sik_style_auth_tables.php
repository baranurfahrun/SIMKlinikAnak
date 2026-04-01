<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSikStyleAuthTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Tabel khusus Super Admin
        Schema::create('admin', function (Blueprint $table) {
            $table->string('usere', 100)->primary(); // ID User terenkripsi
            $table->string('passworde', 255);       // Password terenkripsi
        });

        // Tabel khusus User/Staf (Dokter/Perawat dll)
        Schema::create('user_pegawai', function (Blueprint $table) {
            $table->string('id_user', 100)->primary(); // ID User terenkripsi
            $table->string('password', 255);           // Password terenkripsi
            $table->string('nik', 20);
        });
    }

    public function down()
    {
        Schema::dropIfExists('admin');
        Schema::dropIfExists('user_pegawai');
    }
}
