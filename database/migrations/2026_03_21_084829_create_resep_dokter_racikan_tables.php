<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResepDokterRacikanTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('resep_dokter_racikan', function (Blueprint $table) {
            $table->id();
            $table->string('no_resep', 20); // Fk ke resep_obat
            $table->string('nama_racik', 100);
            $table->string('metode_racik', 30);
            $table->string('aturan_pakai', 100);
            $table->double('jml_dr'); // Berapa bungkus
            $table->timestamps();
            
            $table->index('no_resep');
        });

        Schema::create('resep_dokter_racikan_detail', function (Blueprint $table) {
            $table->id();
            $table->string('no_resep', 20);
            $table->string('nama_racik', 100); // Nama grup raciknya untuk pengelompokan
            $table->string('kode_brng', 15); // Kode bahan obat
            $table->double('jml'); // Dosis per bungkus (Sesuai kesepakatan)
            $table->timestamps();
            
            $table->index(['no_resep', 'nama_racik']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('resep_dokter_racikan_detail');
        Schema::dropIfExists('resep_dokter_racikan');
    }
}
