self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'System Alert';
  const options = {
    body: data.body || 'You have a new notification.',
    icon: '/vite.svg',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});