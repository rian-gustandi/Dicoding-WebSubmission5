// Mengimport Workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

// Precaching App Shell
workbox.precaching.precacheAndRoute([
  { url: '/crud-areas.html', revision: '1' },
  { url: '/crud-competitions.html', revision: '1' },
  { url: '/football.html', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: '/nav.html', revision: '1' },
  { url: '/home.html', revision: '1' },
  { url: '/areas.html', revision: '1' },
  { url: '/competitions.html', revision: '1' },
  { url: '/push.html', revision: '1' },
  { url: '/football.png', revision: '1' },
  { url: '/maskable_icon.png', revision: '1' },
  { url: '/manifest.json', revision: '1' },
  { url: '/note.txt', revision: '1' },
  { url: '/hosting.txt', revision: '1' },
  { url: '/push.js', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/css/materialize.css', revision: '1' },
  { url: '/js/api.js', revision: '1' },
  { url: '/js/db.js', revision: '1' },
  { url: '/js/idb.js', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: '/js/nav.js', revision: '1' },
  { url: '/js/script.js', revision: '1' },
], {
    ignoreURLParametersMatching: [/.*/]
});

// Caching Halaman
workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate()
);

// Mengganti Nama Objek Cache
workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pages'
  })
);

// #1 fetch API 
// workbox.routing.registerRoute(
//   ({ url }) => url.origin === 'https://api.football-data.org/v2/',
//   workbox.strategies.staleWhileRevalidate({
//     cacheName: 'URL',
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 10
//       })
//     ]
//   })
// );

// #2 fetch API 
workbox.routing.registerRoute(
  new RegExp('https://cors-anywhere.herokuapp.com/http://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'URL'
  })
);

self.addEventListener('push', function (event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  let options = {
    body: body,
    icon: 'football.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});