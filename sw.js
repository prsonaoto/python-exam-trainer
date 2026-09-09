const CACHE_NAME = "python-exam-trainer-v6";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./data/questions-01.js",
  "./data/questions-02.js",
  "./data/questions-03.js",
  "./data/questions-04.js",
  "./data/questions-05.js",
  "./data/questions-06.js",
  "./data/fixes.js",
  "./data/v6.js"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(fetch(event.request).then(response => {
    const copy=response.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match(event.request).then(r => r || caches.match("./index.html"))));
});
