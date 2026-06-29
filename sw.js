const CACHE = 'parallel-v3';
const ASSETS = [
  '/parallel/',
  '/parallel/index.html',
  '/parallel/sw.js',
  '/parallel/manifest.webmanifest',
  '/parallel/icon-192.png',
  '/parallel/icon-512.png',
  '/parallel/bg.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })))).catch(() => {}));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
