/* eslint-disable no-restricted-globals */

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
   ({ request, url }) => {
      if (request.mode !== 'navigate') {
         return false;
      }
      if (url.pathname.startsWith('/_')) {
         return false;
      }
      if (url.pathname.match(fileExtensionRegexp)) {
         return false;
      }
      return true;
   },
   createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

registerRoute(
   ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
   new StaleWhileRevalidate({
      cacheName: 'images',
      plugins: [new ExpirationPlugin({ maxEntries: 50 })],
   })
);

self.addEventListener('message', (event) => {
   if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
   }
});

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
