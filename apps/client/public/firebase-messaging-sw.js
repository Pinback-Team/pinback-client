// 서비스 워커 파일
self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function () {
  console.log('fcm sw activate..');
});

self.addEventListener('push', function (e) {
  if (!e.data.json()) return;
  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
  };
  console.log(resultData.title, {
    body: resultData.body,
  });
  e.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});
