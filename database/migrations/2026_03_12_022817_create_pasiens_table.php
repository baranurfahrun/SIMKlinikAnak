<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePasiensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pasien', function (Blueprint $table) {
            $table->string('no_rkm_medis', 15)->primary(); // No. Rekam Medis
            $table->string('nm_pasien', 100);
            $table->string('nik', 255); // Kita enkripsi karakternya
            $table->enum('jk', ['L', 'P']);
            $table->date('tgl_lahir');
            $table->string('nm_ibu', 100);
            $table->string('no_tlp', 20); // WhatsApp Orang Tua
            $table->text('alamat');
            $table->timestamp('tgl_daftar')->useCurrent();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pasien');
    }
}
