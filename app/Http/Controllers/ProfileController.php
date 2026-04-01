<?php

namespace App\Http\Controllers;

use App\Helpers\SIKCrypt;
use App\Models\Admin;
use App\Models\UserPegawai;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:100',
            'new_password' => 'nullable|min:4',
            'foto_profil' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $user = Auth::guard('admin')->user() ?: Auth::guard('pegawai')->user();

        if (!$user) {
            return redirect()->back()->withErrors(['error' => 'Sesi Anda telah berakhir, silakan login kembali.']);
        }

        // 1. Update Nama
        if (isset($user->nama)) {
            $user->nama = $request->nama; // Admin
        } else {
            $user->nama_pegawai = $request->nama; // Pegawai
        }

        // 2. Update Password if Filled
        if ($request->filled('new_password')) {
            $encryptedPassword = SIKCrypt::encrypt($request->new_password);
            if (isset($user->passworde)) {
                $user->passworde = $encryptedPassword; // Admin
            } else {
                $user->password = $encryptedPassword; // Pegawai
            }
        }

        // 3. Handle Foto Profil
        if ($request->hasFile('foto_profil')) {
            $file = $request->file('foto_profil');
            
            // Buat direktori jika belum ada yang fix
            $destinationPath = public_path('storage/avatars');
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0777, true);
            }

            // Penamaan File berbasis ID User
            $userId = isset($user->usere) ? SIKCrypt::decrypt($user->usere) : SIKCrypt::decrypt($user->id_user);
            $safeName = preg_replace('/[^a-zA-Z0-9]/', '_', $userId);
            
            // --- HAPUS FOTO LAMA (HANYA SIMPAN 1 FOTO) ---
            $oldFiles = glob($destinationPath . '/profile_' . $safeName . '.*');
            if ($oldFiles) {
                foreach ($oldFiles as $oldFile) {
                    if (is_file($oldFile)) {
                        @unlink($oldFile);
                    }
                }
            }
            // -----------------------------------------------

            $fileName = 'profile_' . $safeName . '.' . $file->getClientOriginalExtension();
            
            // Pindah file
            $file->move($destinationPath, $fileName);
            
            // Simpan path ke DB (yang sudah ditambahkan kolomnya sebelumnya)
            $user->foto_profil = '/storage/avatars/' . $fileName;
        }

        $user->save();

        return redirect()->back()->with('success', 'Profil Anda berhasil diperbarui! 🎉');
    }
}
