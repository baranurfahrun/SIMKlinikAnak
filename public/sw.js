const CACHE_NAME = 'simklinik-cache-v2';
const ASSETS = [
    '/',
    '/images/logo.png',
    '/images/logo_pwa.png'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
        ))
    );
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Network First untuk request navigasi halaman dan POST
    if (event.request.mode === 'navigate' || event.request.method === 'POST') {
        event.respondWith(
            fetch(event.request).catch(() => caches.match(event.request))
        );
    } else {
        // Cache First untuk aset statis (images, css, js)
        event.respondWith(
            caches.match(event.request).then((response) => response || fetch(event.request))
        );
    }
});
