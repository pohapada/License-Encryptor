const CACHE_NAME = 'encryptor-cache-v1';
const FILES_TO_CACHE = [
  '/License-Encryptor/',
  '/License-Encryptor/index.html',
  '/License-Encryptor/crypto-js.min.js',
  '/License-Encryptor/icon.png',
  '/License-Encryptor/icon-512.png',
  '/License-Encryptor/manifest.json'
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
