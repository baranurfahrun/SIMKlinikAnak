<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDetailsToDokterTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('dokter', function (Blueprint $table) {
            $table->enum('jk', ['L', 'P'])->nullable();
            $table->string('tmp_lahir')->nullable();
            $table->date('tgl_lahir')->nullable();
            $table->string('gol_darah', 5)->nullable();
            $table->string('agama', 20)->nullable();
            $table->string('alamat')->nullable();
            $table->string('no_telp', 20)->nullable();
            $table->string('stts_nikah', 20)->nullable();
            $table->string('alumni')->nullable();
            $table->string('no_sip')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('dokter', function (Blueprint $table) {
            //
        });
    }
}
