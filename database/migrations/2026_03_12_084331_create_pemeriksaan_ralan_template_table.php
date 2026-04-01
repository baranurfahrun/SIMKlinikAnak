<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePemeriksaanRalanTemplateTable extends Migration
{
    public function up()
    {
        Schema::create('pemeriksaan_ralan_template', function (Blueprint $table) {
            $table->id();
            $table->string('nip')->nullable();
            $table->text('keluhan')->nullable();
            $table->text('pemeriksaan')->nullable();
            $table->text('penilaian')->nullable();
            $table->text('tindak_lanjut')->nullable();
            $table->text('instruksi')->nullable();
            $table->text('evaluasi')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pemeriksaan_ralan_template');
    }
}
