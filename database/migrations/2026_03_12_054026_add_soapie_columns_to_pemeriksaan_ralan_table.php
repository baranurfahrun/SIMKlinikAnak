<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSoapieColumnsToPemeriksaanRalanTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('pemeriksaan_ralan', function (Blueprint $table) {
            $table->string('spo2', 10)->nullable()->after('respirasi');
            $table->string('lingkar_perut', 10)->nullable()->after('berat');
            $table->string('kesadaran', 30)->nullable()->after('gcs');
            $table->text('instruksi')->nullable()->after('tindak_lanjut');
            $table->text('evaluasi')->nullable()->after('instruksi');
            $table->string('nip', 20)->nullable()->after('alergi'); // Untuk mencatat siapa yang melakukan
        });
    }

    public function down()
    {
        Schema::table('pemeriksaan_ralan', function (Blueprint $table) {
            $table->dropColumn(['spo2', 'lingkar_perut', 'kesadaran', 'instruksi', 'evaluasi', 'nip']);
        });
    }
}
