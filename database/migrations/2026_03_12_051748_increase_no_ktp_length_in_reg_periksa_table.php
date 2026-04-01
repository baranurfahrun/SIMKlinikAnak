<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class IncreaseNoKtpLengthInRegPeriksaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('ALTER TABLE reg_periksa MODIFY no_ktp VARCHAR(100)');
    }

    public function down()
    {
        DB::statement('ALTER TABLE reg_periksa MODIFY no_ktp VARCHAR(20)');
    }
}
