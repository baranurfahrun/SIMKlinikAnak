<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Helpers\SIKCrypt;
use App\Models\Admin;
use App\Models\UserPegawai;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CustomLoginController extends Controller
{
    public function showLoginForm()
    {
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
            'captcha_code' => 'required|string',
        ]);

        if (strtoupper($request->captcha_code) !== session('captcha_code')) {
            return back()->withErrors([
                'username' => 'Kode Keamanan (Captcha) tidak sesuai.',
            ]);
        }

        // 1. Enkripsi input untuk dicocokan dengan database
        $user_enc = SIKCrypt::encrypt($request->username);
        $pass_enc = SIKCrypt::encrypt($request->password);

        // 2. Coba Login sebagai Admin
        $admin = Admin::where('usere', $user_enc)
                      ->where('passworde', $pass_enc)
                      ->first();

        if ($admin) {
            Auth::guard('pegawai')->logout(); // Clear potentially conflicting old session
            Auth::guard('admin')->login($admin);
            AuditLog::record('LOGIN_SUCCESS', 'Admin login: ' . $admin->nama);
            $request->session()->regenerate();
            return redirect()->intended('/dashboard');
        }

        // 3. Coba Login sebagai Pegawai
        $pegawai = UserPegawai::where('id_user', $user_enc)
                              ->where('password', $pass_enc)
                              ->first();

        if ($pegawai) {
            Auth::guard('admin')->logout(); // Ensure admin is logged out so we don't accidentally fall back to it
            Auth::guard('pegawai')->login($pegawai);
            AuditLog::record('LOGIN_SUCCESS', 'Pegawai login: ' . $pegawai->nama);
            $request->session()->regenerate();
            return redirect()->intended('/dashboard');
        }

        AuditLog::record('LOGIN_FAILED', 'Failed login attempt for username: ' . $request->username);

        return back()->withErrors([
            'username' => 'Username atau Password tidak sesuai.',
        ]);
    }

    public function logout(Request $request)
    {
        $user = Auth::guard('admin')->user() ?: Auth::guard('pegawai')->user();
        AuditLog::record('LOGOUT', 'User logged out: ' . ($user->nama ?? 'Unknown'));

        Auth::guard('admin')->logout();
        Auth::guard('pegawai')->logout();
        
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    }
}
