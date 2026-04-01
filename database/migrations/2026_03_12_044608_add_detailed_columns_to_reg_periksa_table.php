<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDetailedColumnsToRegPeriksaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('reg_periksa', function (Blueprint $table) {
            $table->string('p_jawab', 100)->nullable();
            $table->string('hubunganpj', 20)->nullable();
            $table->string('almt_pj', 200)->nullable();
            $table->string('kd_pj', 3)->default('UMM'); // Default Umum
            $table->string('asal_rujukan', 100)->nullable();
            $table->string('no_ktp', 20)->nullable(); // No Kartu / BPJS
        });
    }

    public function down()
    {
        Schema::table('reg_periksa', function (Blueprint $table) {
            $table->dropColumn(['p_jawab', 'hubunganpj', 'almt_pj', 'kd_pj', 'asal_rujukan', 'no_ktp']);
        });
    }
}
