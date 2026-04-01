<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePemeriksaanRalanTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pemeriksaan_ralan', function (Blueprint $table) {
            $table->string('no_rawat', 20);
            $table->date('tgl_pemeriksaan');
            $table->time('jam_pemeriksaan');
            $table->string('suhu_tubuh', 5)->nullable();
            $table->string('tensi', 8)->nullable();
            $table->string('nadi', 3)->nullable();
            $table->string('respirasi', 3)->nullable();
            $table->string('tinggi', 5)->nullable();
            $table->string('berat', 5)->nullable();
            $table->string('gcs', 10)->nullable();
            $table->text('keluhan')->nullable();
            $table->text('pemeriksaan')->nullable();
            $table->text('penilaian')->nullable();
            $table->text('tindak_lanjut')->nullable();
            $table->string('alergi', 50)->nullable();
            $table->timestamps();

            $table->primary(['no_rawat', 'tgl_pemeriksaan', 'jam_pemeriksaan'], 'pk_pemeriksaan_ralan');
            $table->foreign('no_rawat')->references('no_rawat')->on('reg_periksa')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('pemeriksaan_ralan');
    }
}
