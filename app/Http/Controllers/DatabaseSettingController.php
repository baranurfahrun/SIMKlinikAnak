<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DatabaseSettingController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/DatabaseSetting', [
            'settings' => [
                'db_host' => Setting::get('db_host', config('database.connections.mysql.host')),
                'db_port' => Setting::get('db_port', config('database.connections.mysql.port')),
                'db_name' => Setting::get('db_name', config('database.connections.mysql.database')),
                'db_user' => Setting::get('db_user', config('database.connections.mysql.username')),
                'db_pass' => Setting::get('db_pass', ''), // Don't send actual password if not needed, but here it might be useful for forms
            ]
        ]);
    }

    public function testConnection(Request $request)
    {
        $request->validate([
            'db_host' => 'required',
            'db_port' => 'required',
            'db_name' => 'required',
            'db_user' => 'required',
        ]);

        try {
            // Kita coba bikin koneksi temporary
            $config = config('database.connections.mysql');
            $config['host'] = $request->db_host;
            $config['port'] = $request->db_port;
            $config['database'] = $request->db_name;
            $config['username'] = $request->db_user;
            $config['password'] = $request->db_pass ?? '';

            config(['database.connections.temp_test' => $config]);
            
            DB::connection('temp_test')->getPdo();
            
            return response()->json([
                'status' => 'success',
                'message' => 'Koneksi Berhasil! Database SIMRS terhubung dengan baik.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Koneksi Gagal: ' . $e->getMessage()
            ], 500);
        }
    }

    public function saveConnection(Request $request)
    {
        $request->validate([
            'db_host' => 'required',
            'db_port' => 'required',
            'db_name' => 'required',
            'db_user' => 'required',
        ]);

        Setting::set('db_host', $request->db_host);
        Setting::set('db_port', $request->db_port);
        Setting::set('db_name', $request->db_name);
        Setting::set('db_user', $request->db_user);
        
        if ($request->filled('db_pass')) {
            Setting::set('db_pass', $request->db_pass);
        }

        return redirect()->back()->with('success', 'Konfigurasi Database berhasil disimpan');
    }
}
