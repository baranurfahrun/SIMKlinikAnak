<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPhotoAndNameToAuthTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // 1. Tambahkan nama dan foto_profil ke tabel admin
        Schema::table('admin', function (Blueprint $table) {
            if (!Schema::hasColumn('admin', 'nama')) {
                $table->string('nama', 100)->nullable()->after('passworde');
            }
            if (!Schema::hasColumn('admin', 'foto_profil')) {
                $table->string('foto_profil', 255)->nullable()->after('nama');
            }
        });

        // 2. Tambahkan foto_profil ke tabel user_pegawai
        Schema::table('user_pegawai', function (Blueprint $table) {
            if (!Schema::hasColumn('user_pegawai', 'foto_profil')) {
                $table->string('foto_profil', 255)->nullable()->after('alumni');
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('admin', function (Blueprint $table) {
            $table->dropColumn(['nama', 'foto_profil']);
        });

        Schema::table('user_pegawai', function (Blueprint $table) {
            $table->dropColumn(['foto_profil']);
        });
    }
}
