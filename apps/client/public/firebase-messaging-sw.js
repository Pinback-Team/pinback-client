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

  const notificationTitle = payload.notification?.title ?? 'pinback';
  const notificationOptions = {
    body: payload.data?.body ?? '저장한 북마크를 확인해 보세요!',
    icon: payload.data?.icon ?? '/FCM-IMG.png',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
