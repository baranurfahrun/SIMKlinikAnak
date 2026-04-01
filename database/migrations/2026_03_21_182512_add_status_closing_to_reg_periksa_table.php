<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddStatusClosingToRegPeriksaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('reg_periksa', function (Blueprint $table) {
            $table->enum('status_closing', ['Belum', 'Selesai'])->default('Belum')->after('no_rawat');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('reg_periksa', function (Blueprint $table) {
            $table->dropColumn('status_closing');
        });
    }
}
