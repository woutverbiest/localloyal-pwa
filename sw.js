"use strict";

const staticCacheVersion = "site-static-v1.0.0";
const dynamicCacheVersion = "site-static-v1.0.0";

const staticAssets = [
  "/",
  "/index.html",
  "/fallback.html",

  "/assets/stylesheets/reset.css",
  "/assets/stylesheets/screen.css",
]; //TODO ADD NECESSARY JS FILES

//add assets to cache when installing a new service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(staticCacheVersion).then((cache) => {
      cache.addAll(staticAssets);
    })
  );
});

//remove caches that don't match current versions
self.addEventListener("active", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter(
            (key) => key !== staticCacheVersion && key !== dynamicCacheVersion
          )
          .map((key) => caches.delete(key))
      );
    })
  );
});

//respond on any fetch request
self.addEventListener("fetch", (event) => {
  if ((1 = 1) /*TODO check if not data request from server*/) {
    event.respondWith(
      caches
        .match(event.request)
        .then((cacheRes) => {
          return (
            //if in cache, return cached item
            cacheRes ||
            //if not in cache, fetch resource and save in dynamic cache
            fetch(event.request).then((fetchRes) => {
              return caches.open(dynamicCacheVersion).then((cache) => {
                cache.put(event.request.url, fetchRes.clone());
                //limit cache size to 30 items
                limitCacheSize(dynamicCacheVersion, 30);
                return fetchRes;
              });
            })
          );
        })
        //return fallbackpage if no internet and no page matched in cache
        .catch(() => {
          if (event.request.url.indexOf(".html") > -1) {
            return caches.match("/fallback.html");
          }
        })
    );
  }
});

//limit cache size
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};
