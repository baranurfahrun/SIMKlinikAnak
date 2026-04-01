<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePharmacyTables extends Migration
{
    public function up()
    {
        // Master Data Obat/Barang
        if (!Schema::hasTable('databarang')) {
            Schema::create('databarang', function (Blueprint $table) {
                $table->string('kode_brng', 15)->primary();
                $table->string('nama_brng', 80);
                $table->string('kode_sat', 4)->nullable();
                $table->double('hargajual')->default(0);
                $table->string('status', 1)->default('1');
                $table->timestamps();
            });
        }

        // Header Resep Obat
        if (!Schema::hasTable('resep_obat')) {
            Schema::create('resep_obat', function (Blueprint $table) {
                $table->string('no_resep', 14)->primary();
                $table->date('tgl_perawatan');
                $table->time('jam_perawatan');
                $table->string('no_rawat', 17);
                $table->string('kd_dokter', 20);
                $table->date('tgl_penyerahan')->nullable();
                $table->time('jam_penyerahan')->nullable();
                $table->timestamps();

                $table->foreign('no_rawat')->references('no_rawat')->on('reg_periksa')->onDelete('cascade');
                $table->foreign('kd_dokter')->references('kd_dokter')->on('dokter');
            });
        }

        // Detail Resep (Input dari Dokter)
        if (!Schema::hasTable('resep_dokter')) {
            Schema::create('resep_dokter', function (Blueprint $table) {
                $table->string('no_resep', 14);
                $table->string('kode_brng', 15);
                $table->double('jml');
                $table->string('aturan_pakai', 150);
                $table->timestamps();

                $table->primary(['no_resep', 'kode_brng']);
                $table->foreign('no_resep')->references('no_resep')->on('resep_obat')->onDelete('cascade');
                $table->foreign('kode_brng')->references('kode_brng')->on('databarang');
            });
        }
    }

    public function down()
    {
        Schema::dropIfExists('resep_dokter');
        Schema::dropIfExists('resep_obat');
        Schema::dropIfExists('databarang');
    }
}
