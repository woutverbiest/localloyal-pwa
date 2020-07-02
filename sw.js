"use strict";

const staticCacheVersion = "site-static-v1.0.0";
const dynamicCacheVersion = "site-dynamic-v1.0.0";

const staticAssets = [
  "/",
  "/index.html",
  "/fallback.html",
  "/login.html",
  "/signup.html",
  "/settings.html",
  "/code.html",

  "/assets/js/qrcodejs/qrcode.min.js",
  "/assets/js/code.js",

  "/assets/stylesheets/reset.css",
  "/assets/stylesheets/screen.css",
]; 
//TODO ADD NECESSARY JS FILES

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
  if (true) {
    //TODO check if not data request from server
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
        //return fallback if no internet and no page matched in cache
        .catch(() => {
          if (event.request.url.indexOf(".html") > -1) {
            return caches.match("/fallback.html");
          } else if (event.request.url.indexOf(".json") > -1){
            return {"error":"offline"}
          }
        })
    );
  } else {
    return null;
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

self.addEventListener("push", (event) => {
  let message = event.data.text();
  self.registration.showNotification(message);
});

//TODO add some functionality
self.addEventListener("notificationclick", event => {
  event.waitUntil(
    self.ClientRectList.openWindow("http://http://127.0.0.1:5500/index.html")
  );
})