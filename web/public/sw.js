const CACHE_NAME = "pixcloak-pwa-v1";
// Keep the service worker deliberately narrow: it supports the installed app's
// identity assets, but never caches tool pages, user files, or Next.js bundles.
const ASSETS = [
  "/manifest.webmanifest",
  "/manifest.zh.webmanifest",
  "/favicon.svg",
  "/icons/apple-touch-icon.png",
  "/icons/pixcloak-192.png",
  "/icons/pixcloak-512.png",
  "/icons/pixcloak-maskable-512.png",
  "/icons/shortcut-safe-share.png",
  "/icons/shortcut-upload-ready.png",
  "/icons/shortcut-pdf-to-image.png",
  "/icons/shortcut-image-to-pdf.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith("pixcloak-") && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || !ASSETS.includes(url.pathname)) return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
