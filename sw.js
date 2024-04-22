var cacheName = "hello-pwa";
var filesToCache = ["/", "/index.html", "/css/style.css", "/js/main.js"];

/* Start the service worker and cache all of the app's content */
self.addEventListener("install", async (e) => {
  try {
    const cache = await caches.open(cacheName);
    await cache.addAll(filesToCache);
    self.skipWaiting();
  } catch (error) {
    console.error("Error during service worker installation:", error);
  }
});

/* Serve cached content when offline */
self.addEventListener("fetch", async (e) => {
  try {
    const response = await caches.match(e.request);
    return response || fetch(e.request);
  } catch (error) {
    console.error("Error during fetch event:", error);
  }
});
