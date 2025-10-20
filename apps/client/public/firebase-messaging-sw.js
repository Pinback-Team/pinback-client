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

self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function () {
  console.log('실행중..');
});

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);

  const url = payload.data?.url || 'https://www.pinback.today';
  const notificationTitle = payload.notification?.title || 'pinback';

  const notificationOptions = {
    body: payload.notification?.body || '저장한 북마크를 확인해 보세요!',
    icon: payload.notification?.image || '/FCM-IMG.png',
    image: payload.notification?.image || '/FCM-IMG.png',
    data: { url },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  console.log('🔔 알림 클릭됨:', event);

  const targetUrl = event.notification.data?.url || 'https://www.pinback.today';

  fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=G-847ZNSCC3J&api_secret=1hei57fPTKyGX5Cw73rwgA`,
    {
      method: 'POST',
      body: JSON.stringify({
        client_id: 'serviceworker',
        events: [
          {
            name: 'reminder_push_click',
            params: {
              category: '리마인드 알림',
              label: '리마인드 푸시 알림 클릭 (대시보드 이동)',
            },
          },
        ],
      }),
    }
  ).catch((err) => console.warn('GA 이벤트 전송 실패', err));

  event.waitUntil(
    (async () => {
      const clientList = await clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });

      for (const client of clientList) {
        if (client.url === targetUrl && 'focus' in client) {
          client.focus();
          event.notification.close();
          return;
        }
      }

      if (clients.openWindow) {
        const newClient = await clients.openWindow(targetUrl);
        event.notification.close();
        return newClient;
      }
    })()
  );
});
