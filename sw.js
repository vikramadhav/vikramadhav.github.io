const CACHE_VERSION = "v1";
const STATIC_CACHE = `site-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `site-runtime-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  "/",
  "/index.html",
  "/star.html",
  "/assets/css/style.css",
  "/assets/css/stars.css",
  "/assets/js/main.js",
  "/assets/js/googleanalytics.js",
  "/assets/vendor/bootstrap/css/bootstrap.min.css",
  "/assets/vendor/bootstrap/js/bootstrap.bundle.min.js",
  "/assets/vendor/jquery/jquery.min.js",
  "/assets/vendor/php-email-form/validate.js",
  "/assets/vendor/waypoints/jquery.waypoints.min.js",
  "/assets/vendor/counterup/counterup.min.js",
  "/assets/vendor/remixicon/remixicon.css",
  "/assets/vendor/icofont/icofont.min.css",
  "/assets/vendor/boxicons/css/boxicons.min.css",
  "/assets/img/programmer.svg",
  "/assets/img/bg-min-mobile.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(async () => {
          const cachedPage = await caches.match(event.request);
          return cachedPage || caches.match("/index.html");
        })
    );
    return;
  }

  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type === "opaque") {
            return response;
          }

          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match("/index.html"));
    })
  );
});
