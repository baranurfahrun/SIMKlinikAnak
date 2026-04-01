<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDetailsToUserPegawaiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_pegawai', function (Blueprint $table) {
            $table->string('nama_pegawai', 100)->nullable()->after('id_user');
            $table->enum('jk', ['L', 'P'])->nullable()->after('nama_pegawai');
            $table->string('tmp_lahir', 50)->nullable()->after('jk');
            $table->date('tgl_lahir')->nullable()->after('tmp_lahir');
            $table->string('alamat', 200)->nullable()->after('tgl_lahir');
            $table->string('no_telp', 20)->nullable()->after('alamat');
            $table->string('jabatan', 50)->nullable()->after('no_telp');
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
            $table->dropColumn(['nama_pegawai', 'jk', 'tmp_lahir', 'tgl_lahir', 'alamat', 'no_telp', 'jabatan']);
        });
    }
}
