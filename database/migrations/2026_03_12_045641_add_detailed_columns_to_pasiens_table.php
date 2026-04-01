<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDetailedColumnsToPasiensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('pasien', function (Blueprint $table) {
            $table->string('tmp_lahir', 50)->nullable();
            $table->string('agama', 20)->nullable();
            $table->string('pekerjaan', 50)->nullable();
            $table->string('stts_nikah', 20)->nullable();
            $table->string('gol_darah', 5)->nullable();
            $table->string('pendidikan', 20)->nullable();
            $table->string('no_peserta', 30)->nullable(); // No BPJS/KJS
            $table->string('email', 100)->nullable();
            $table->string('suku_bangsa', 50)->nullable();
            $table->string('bahasa_pasien', 50)->nullable();
            $table->string('cacat_fisik', 100)->nullable();
            $table->string('kelurahan', 50)->nullable();
            $table->string('kecamatan', 50)->nullable();
            $table->string('kabupaten', 50)->nullable();
            $table->string('propinsi', 50)->nullable();
        });
    }

    public function down()
    {
        Schema::table('pasien', function (Blueprint $table) {
            $table->dropColumn([
                'tmp_lahir', 'agama', 'pekerjaan', 'stts_nikah', 'gol_darah', 
                'pendidikan', 'no_peserta', 'email', 'suku_bangsa', 
                'bahasa_pasien', 'cacat_fisik', 'kelurahan', 'kecamatan', 
                'kabupaten', 'propinsi'
            ]);
        });
    }
}
