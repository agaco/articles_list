const cacheNames = [
  'png',
  'jpg',
  'css',
  'ico',
  'js',
];
const id = 'cachedData';

self.addEventListener('install', (event) => {
  console.log('Service worker installed!');
  event.waitUntil(
    caches.open(id)
      .then((cache) => {
        return cache.addAll(cacheNames);
      })
  );
  return self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activated!');

  event.waitUntil(
    caches
      .keys()
      .then(configCacheName => {
        return Promise.all(
          configCacheName.map(cache => {
            if (configCacheName !== id) {
              return caches.delete(cache);
            }
          })
        );
      })
      .then(() => self.skipWaiting())
  );
});


self.addEventListener('fetch', (event) => {
  const contentToCache = cacheNames;

  let cacheRequest = event.request && contentToCache.find(name => {
    const url = event.request.url;
    return url.includes(name);
  });

  if(cacheRequest){
    event.respondWith(
      caches.open(id)
        .then((cache) => {
          return cache.match(event.request)
            .then((response) => {
              if (response) {
                console.log('SERVED FROM CACHE', event.request.url);
                return response;
              }
              return fetch(event.request)
                .then((response) => {
                  let responseClone = response.clone();
                  caches.open(id)
                    .then((cache) => {
                      event.request.method == 'GET'
                      && responseClone.status == 200
                      && cache.put(event.request, responseClone);
                    })
                    .catch((error) => console.log('error', error));
                  return response;
                });
            });
        })

    );
  }


});
