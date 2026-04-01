<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Fonts & Icons -->
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

        <!-- Scripts -->
        @routes
        <link rel="stylesheet" href="{{ mix('css/app.css') }}">
        <script src="{{ mix('js/app.js') }}" defer></script>
        @inertiaHead
        <link rel="manifest" href="/manifest.json">
        <meta name="theme-color" content="#0ea5e9">
        <style>
            @keyframes slideUp {
                from { transform: translateY(100px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .animate-slide-up { animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        </style>
    </head>
    <body class="font-sans antialiased text-slate-800">
        @inertia

        <!-- PWA Install Banner -->
        <div id="pwa-install-banner" class="hidden fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:bottom-8 md:w-96 bg-white/90 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/50 flex flex-col gap-4 z-[99999] animate-slide-up">
            <div class="flex items-center gap-4">
                <img src="/images/logo_pwa.png" class="w-12 h-12 rounded-2xl shadow-lg flex-shrink-0 object-cover" />
                <div>
                    <h4 class="text-sm font-black text-slate-800 tracking-tight">Pasang Aplikasi SIMKlinik</h4>
                    <p class="text-[11px] text-slate-400 font-bold tracking-wide mt-0.5">Bisa dibuka langsung tanpa perlu masuk browser!</p>
                </div>
            </div>
            <div class="flex gap-2">
                <button onclick="dismissInstall()" class="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-500 text-xs font-black rounded-xl transition-all">Nanti Saja</button>
                <button onclick="handleInstallClick()" class="flex-1 py-2.5 bg-gradient-to-r from-sky-600 to-sky-500 text-white text-xs font-black rounded-xl shadow-md shadow-sky-100/50 hover:shadow-lg hover:shadow-sky-200/50 hover:-translate-y-0.5 active:translate-y-0 transition-all">Pasang Sekarang</button>
            </div>
        </div>

        <script>
            let deferredPrompt;
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                deferredPrompt = e;
                document.getElementById('pwa-install-banner').classList.remove('hidden');
            });

            function handleInstallClick() {
                document.getElementById('pwa-install-banner').classList.add('hidden');
                if (deferredPrompt) {
                    deferredPrompt.prompt();
                    deferredPrompt.userChoice.then((choiceResult) => {
                        deferredPrompt = null;
                    });
                }
            }

            function dismissInstall() {
                document.getElementById('pwa-install-banner').classList.add('hidden');
            }

            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/sw.js');
                });
            }
        </script>
    </body>
</html>
