// service-worker.js
const CACHE_NAME = 'encryptor-cache-v1';
const FILES_TO_CACHE = [
  './',               // معادل index.html
  './index.html',
  './crypto-js.min.js',
  './icon.png',       // آیکن 192×192
  './icon-512.png',   // آیکن 512×512
  './manifest.json'
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request)
      .then(resp => resp || fetch(evt.request))
  );
});
