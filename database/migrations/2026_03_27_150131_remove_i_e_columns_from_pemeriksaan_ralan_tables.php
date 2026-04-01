<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveIEColumnsFromPemeriksaanRalanTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('pemeriksaan_ralan', function (Blueprint $table) {
            $table->dropColumn(['instruksi', 'evaluasi']);
        });

        Schema::table('pemeriksaan_ralan_template', function (Blueprint $table) {
            $table->dropColumn(['instruksi', 'evaluasi']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('pemeriksaan_ralan', function (Blueprint $table) {
            $table->text('instruksi')->nullable();
            $table->text('evaluasi')->nullable();
        });

        Schema::table('pemeriksaan_ralan_template', function (Blueprint $table) {
            $table->text('instruksi')->nullable();
            $table->text('evaluasi')->nullable();
        });
    }
}
