<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMoreHrDetailsToUserPegawaiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_pegawai', function (Blueprint $table) {
            $table->string('gol_darah', 5)->nullable()->after('tgl_lahir');
            $table->string('agama', 20)->nullable()->after('gol_darah');
            $table->string('stts_nikah', 20)->nullable()->after('no_telp');
            $table->string('alumni', 200)->nullable()->after('stts_nikah');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_pegawai', function (Blueprint $table) {
            $table->dropColumn(['gol_darah', 'agama', 'stts_nikah', 'alumni']);
        });
    }
}
