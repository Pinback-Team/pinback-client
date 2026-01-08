console.log('컨텐츠 스크립트 로드됨');
window.addEventListener('message', (event) => {
  if (event.source !== window) return;
  if (event.data.type === 'SET_TOKEN') {
    chrome.runtime.sendMessage({
      type: 'SET_TOKEN',
      token: event.data.token,
    });
    chrome.storage.local.set({ token: event.data.token }, () => {
      console.log('Token saved!', event.data.token);
    });
  }
});
