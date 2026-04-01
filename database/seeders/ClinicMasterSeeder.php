<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ClinicMasterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \Illuminate\Support\Facades\DB::table('poliklinik')->insert([
            'kd_poli' => 'PA', // Poli Anak
            'nm_poli' => 'Poliklinik Anak',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        \Illuminate\Support\Facades\DB::table('dokter')->insert([
            'kd_dokter' => 'D001',
            'nm_dokter' => 'Dr. Siska, Sp.A',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
