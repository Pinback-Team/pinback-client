/* eslint-env serviceworker */
/* eslint-disable no-undef */

const firebaseConfig = {
  apiKey: 'AIzaSyD3KM0IQ4Ro3Dd2fyAY8fnhE1bQ_NesrBc',
  authDomain: 'pinback-c55de.firebaseapp.com',
  projectId: 'pinback-c55de',
  storageBucket: 'pinback-c55de.firebasestorage.app',
  messagingSenderId: '370851215931',
  appId: '1:370851215931:web:08382b5e57808d29dcba1e',
  measurementId: 'G-847ZNSCC3J',
};

importScripts(
  'https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js'
);

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  clients.claim();
  console.log('실행중..');
});

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);

  const url = payload.data?.url || 'https://www.pinback.today';

  const notificationTitle = 'pinback'; // 무조건 기본값
  const notificationOptions = {
    body: '저장한 북마크를 확인해 보세요!',
    icon: '/FCM-IMG.png',
    data: { url },
    requireInteraction: true,
    renotify: true,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url = event.notification.data?.url || 'https://www.pinback.today';

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes('pinback.today') && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});
