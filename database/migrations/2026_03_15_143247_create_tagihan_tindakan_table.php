<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTagihanTindakanTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detail_tagihan_tindakan', function (Blueprint $table) {
            $table->id();
            $table->string('no_rawat', 100);
            $table->unsignedBigInteger('id_tarif');
            $table->integer('biaya');
            $table->integer('qty')->default(1);
            $table->timestamps();

            $table->foreign('id_tarif')->references('id')->on('tarif_tindakan')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detail_tagihan_tindakan');
    }
}
