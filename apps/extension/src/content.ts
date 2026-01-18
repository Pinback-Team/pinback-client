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

window.addEventListener('message', (event) => {
  if (event.source !== window) return;
  if (event.data.type === 'Extension-Logout') {
    chrome.storage.local.remove('token', () => {
      console.log('Token removed!');
    });
  }
});
