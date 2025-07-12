const CACHE_NAME = 'encryptor-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/license-encryptor/',
  '/license-encryptor/index.html',
  '/license-encryptor/crypto-js.min.js',
  '/license-encryptor/icon.png',
  '/license-encryptor/icon-192.png',
  '/license-encryptor/icon-512.png',
  '/license-encryptor/manifest.json'
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
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request)
      .then(resp => resp || fetch(evt.request))
  );
});