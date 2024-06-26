/* eslint-disable no-restricted-globals */

self.addEventListener('install', (event) => {
   console.log('Service worker installing...');
   self.skipWaiting();
});

self.addEventListener('activate', (event) => {
   console.log('Service worker activating...');
   event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
   const url = new URL(event.request.url);

   // Adjust URL paths if necessary
   if (url.origin === location.origin) {
      if (url.pathname === '/scema/') {
         event.respondWith(caches.match('/index.html'));
         return;
      }
   }

   console.log('Fetching:', event.request.url);
   event.respondWith(
      caches.match(event.request).then((response) => {
         return response || fetch(event.request);
      })
   );
});

// Handle push notifications
self.addEventListener('push', (event) => {
   const data = event.data.json();
   const title = data.title || 'Notification';
   const options = {
      body: data.body,
      icon: data.icon || '/icon-192x192.png',
      badge: data.badge || '/badge-72x72.png',
   };
   event.waitUntil(self.registration.showNotification(title, options));
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
   event.notification.close();
   event.waitUntil(
      self.clients.matchAll({ type: 'window' }).then((clientList) => {
         for (const client of clientList) {
            if (client.url === '/' && 'focus' in client) {
               return client.focus();
            }
         }
         if (self.clients.openWindow) {
            return self.clients.openWindow('/');
         }
      })
   );
});

// Add an event listener for custom test push events
self.addEventListener('message', (event) => {
   console.log('Received message:', event.data);
   if (event.data && event.data.type === 'test-push') {
      const { title, body } = event.data;
      const options = {
         body: body || 'Test body',
         icon: '/icon-192x192.png',
         badge: '/badge-72x72.png',
      };
      self.registration.showNotification(title || 'Test Title', options);
   }
});
