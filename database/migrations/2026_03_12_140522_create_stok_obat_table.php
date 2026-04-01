<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStokObatTable extends Migration
{
    public function up()
    {
        // Table Stok Realtime
        Schema::create('stok_obat', function (Blueprint $table) {
            $table->string('kode_brng', 15)->primary();
            $table->double('stok')->default(0);
            $table->timestamps();

            $table->foreign('kode_brng')->references('kode_brng')->on('databarang')->onDelete('cascade');
        });

        // Table History Stok Opname
        Schema::create('stok_opname', function (Blueprint $table) {
            $table->string('no_opname', 20)->primary();
            $table->date('tgl_opname');
            $table->string('kode_brng', 15);
            $table->double('stok_sistem');
            $table->double('stok_fisik');
            $table->double('selisih');
            $table->string('keterangan', 100)->nullable();
            $table->timestamps();

            $table->foreign('kode_brng')->references('kode_brng')->on('databarang');
        });
    }

    public function down()
    {
        Schema::dropIfExists('stok_opname');
        Schema::dropIfExists('stok_obat');
    }
}
