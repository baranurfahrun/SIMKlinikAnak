<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request)
    {
        require __DIR__ . '/check_integrity.php';

        // ANTI TAMPER COPYRIGHT PROTECTION (Consistent with Web_dokter)
        $CP_SIGNATURE = "QDIwMjYgYmFyYS5uLmZhaHJ1bi0wODUxMTc0NzYwMDE=";
        $CP_HASH_KEY  = "3e07d2217d54524233697deb8b497061";
        $CP_PRIVATE   = "KODE_RAHASIA_BARA";

        if (md5($CP_SIGNATURE . $CP_PRIVATE) !== $CP_HASH_KEY) {
            die("FATAL ERROR: Copyright signature compromised.");
        }
        \Illuminate\Support\Facades\Log::info('Auth debugging in HandleInertiaRequests', [
            'admin_check' => \Illuminate\Support\Facades\Auth::guard('admin')->check(),
            'admin_user' => optional(\Illuminate\Support\Facades\Auth::guard('admin')->user())->toArray(),
            'pegawai_check' => \Illuminate\Support\Facades\Auth::guard('pegawai')->check(),
            'pegawai_user' => optional(\Illuminate\Support\Facades\Auth::guard('pegawai')->user())->toArray(),
            'session_all' => $request->session()->all(),
        ]);

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user('admin') ?: $request->user('pegawai'),
            ],
            'settings' => [
                'running_text' => \App\Models\Setting::get('running_text', 'Selamat Datang di SIMKlinik Anak. Keamanan Data Prioritas Kami.'),
                'rt_speed' => \App\Models\Setting::get('rt_speed', '15'),
            ],
            'copyright' => [
                'signature' => $CP_SIGNATURE,
            ],
            'integrity' => $GLOBALS['integrity_status'] ?? [],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }
}
