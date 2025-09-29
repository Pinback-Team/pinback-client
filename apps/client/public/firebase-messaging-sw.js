/* eslint-env serviceworker */
/* eslint-disable no-undef */

importScripts(
  './firebase_sdk/firebase-app-compat.js',
  './firebase_sdk/firebase-messaging-compat.js',
  './firebase-config.js'
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

  const notificationTitle = payload.notification?.title ?? '알림이 도착했어요!';
  const notificationOptions = {
    body: payload.notification?.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
