<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddHakAksesToUsersTable extends Migration
{
    public function up()
    {
        // Tambahkan Kolom Hak Akses di Pegawai
        if (Schema::hasTable('user_pegawai')) {
            Schema::table('user_pegawai', function (Blueprint $table) {
                if (!Schema::hasColumn('user_pegawai', 'hak_akses')) {
                    $table->text('hak_akses')->nullable()->after('password');
                }
            });
        }

        // Tambahkan Kolom Hak Akses di Admin
        if (Schema::hasTable('admins')) {
            Schema::table('admins', function (Blueprint $table) {
                if (!Schema::hasColumn('admins', 'hak_akses')) {
                    $table->text('hak_akses')->nullable()->after('passworde');
                }
            });
        }
    }

    public function down()
    {
        if (Schema::hasTable('user_pegawai')) {
            Schema::table('user_pegawai', function (Blueprint $table) {
                $table->dropColumn('hak_akses');
            });
        }
        if (Schema::hasTable('admins')) {
            Schema::table('admins', function (Blueprint $table) {
                $table->dropColumn('hak_akses');
            });
        }
    }
}
