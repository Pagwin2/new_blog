//"use strict";
//
//// used so I can prompt updates to the service worker
//const version = "22-01-2025";
//
//const cache = new Cache();
//
//self.addEventListener("install", (event) => {
//    // can't add /static/* due to demos living there
//    cache.addAll([
//        "/",
//        "/index.html",
//        "/static/css/*",
//        "/static/js/*",
//        "/static/images/*",
//        "/static/video/*"
//    ]);
//});
//
//async function handleCache(event) {
//    const cache_value = await cache.match(event.request);
//    if (cache_value === undefined) {
//        return fetch(event.request);
//    }
//    return cache_value;
//}
//
//self.addEventListener("fetch", async (event) => {
//    event.respondWith(handleCache(event));
//});
