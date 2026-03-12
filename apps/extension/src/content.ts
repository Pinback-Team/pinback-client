import { EXTENSION_MESSAGE_TYPE } from '@pinback/contracts/extension-messages';

window.addEventListener('message', (event) => {
  if (event.source !== window) return;
  if (event.data.type === EXTENSION_MESSAGE_TYPE.setToken) {
    chrome.runtime.sendMessage({
      type: EXTENSION_MESSAGE_TYPE.setToken,
      token: event.data.token,
    });
    chrome.storage.local.set({ token: event.data.token }, () => {
      console.log('Token saved!');
    });
  }
});

window.addEventListener('message', (event) => {
  if (event.source !== window) return;
  if (event.data.type === EXTENSION_MESSAGE_TYPE.logout) {
    chrome.storage.local.remove('token', () => {
      console.log('Token removed!');
    });
  }
});
