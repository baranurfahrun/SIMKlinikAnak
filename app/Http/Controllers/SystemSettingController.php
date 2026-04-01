<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SystemSettingController extends Controller
{
    public function index()
    {
        $settings = [
            'nama_klinik' => Setting::get('nama_klinik', 'SIMKlinik Anak'),
            'alamat_klinik' => Setting::get('alamat_klinik', ''),
            'kontak_klinik' => Setting::get('kontak_klinik', ''),
            'email_klinik' => Setting::get('email_klinik', ''),
            'running_text' => Setting::get('running_text', 'Selamat Datang di SIMKlinik Anak. Keamanan Data Prioritas Kami.'),
            'rt_speed' => Setting::get('rt_speed', '15'),
        ];

        return Inertia::render('Admin/SystemSetting', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'nama_klinik' => 'required|string|max:100',
            'alamat_klinik' => 'nullable|string',
            'kontak_klinik' => 'nullable|string',
            'email_klinik' => 'nullable|email',
            'running_text' => 'nullable|string',
            'rt_speed' => 'nullable|numeric|min:1|max:50',
        ]);

        foreach ($request->only(['nama_klinik', 'alamat_klinik', 'kontak_klinik', 'email_klinik', 'running_text', 'rt_speed']) as $key => $value) {
            Setting::set($key, $value ?: '');
        }

        return redirect()->back()->with('success', 'Konfigurasi sistem berhasil diperbarui! 🎉');
    }
}
