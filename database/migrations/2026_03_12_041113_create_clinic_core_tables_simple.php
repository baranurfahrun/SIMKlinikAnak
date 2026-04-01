<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClinicCoreTablesSimple extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('poliklinik', function (Blueprint $table) {
            $table->string('kd_poli', 5)->primary();
            $table->string('nm_poli', 50);
            $table->timestamps();
        });

        Schema::create('dokter', function (Blueprint $table) {
            $table->string('kd_dokter', 20)->primary();
            $table->string('nm_dokter', 100);
            $table->timestamps();
        });

        Schema::create('reg_periksa', function (Blueprint $table) {
            $table->string('no_reg', 8);
            $table->string('no_rawat', 17)->primary();
            $table->date('tgl_registrasi');
            $table->time('jam_reg');
            $table->string('kd_dokter', 20);
            $table->string('no_rkm_medis', 15);
            $table->string('kd_poli', 5);
            $table->enum('stts', ['Belum', 'Sudah', 'Batal', 'Dirujuk', 'Dirawat'])->default('Belum');
            $table->enum('status_lanjut', ['Ralan', 'Ranap'])->default('Ralan');
            $table->timestamps();

            $table->foreign('kd_poli')->references('kd_poli')->on('poliklinik');
            $table->foreign('kd_dokter')->references('kd_dokter')->on('dokter');
            $table->foreign('no_rkm_medis')->references('no_rkm_medis')->on('pasien');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reg_periksa');
        Schema::dropIfExists('dokter');
        Schema::dropIfExists('poliklinik');
    }
}
