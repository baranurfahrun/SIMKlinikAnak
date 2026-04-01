<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePenerimaanObatTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('penerimaan_obat', function (Blueprint $table) {
            $table->string('no_faktur', 20)->primary();
            $table->date('tgl_penerimaan');
            $table->string('supplier', 100)->nullable();
            $table->text('keterangan')->nullable();
            $table->double('total_bayar')->default(0);
            $table->timestamps();
        });

        Schema::create('detail_penerimaan_obat', function (Blueprint $table) {
            $table->id();
            $table->string('no_faktur', 20);
            $table->string('kode_brng', 15);
            $table->double('jml');
            $table->double('harga_beli');
            $table->date('tgl_expired')->nullable();
            $table->timestamps();

            $table->foreign('no_faktur')->references('no_faktur')->on('penerimaan_obat')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('detail_penerimaan_obat');
        Schema::dropIfExists('penerimaan_obat');
    }
}
