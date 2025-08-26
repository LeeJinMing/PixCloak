const CACHE_NAME = "pixcloak-v3";
// Only pre-cache truly static assets; do not pre-cache app routes
const ASSETS = ["/manifest.webmanifest", "/favicon.svg", "/og.png"];

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
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  // Do not intercept navigations to allow server/Next.js redirects (e.g., / -> /compress)
  if (req.mode === "navigate") {
    return; // let the browser/network handle it
  }
  // Always bypass SW caching for Next.js build assets to avoid stale UI
  const url = new URL(req.url);
  if (url.pathname.startsWith("/_next/")) {
    return; // let the browser/network handle it
  }
  // Network-first for other GET requests with cache fallback
  if (req.method === "GET") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req))
    );
  }
});
