import { EXTENSION_MESSAGE_TYPE } from '@pinback/contracts/extension-messages';

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.identity.getProfileUserInfo(function (info) {
      chrome.storage.local.set({ email: info.email }, () => {
        console.log('User email saved:');
      });
      setTimeout(() => {
        chrome.tabs.create({
          url: `https://pinback.today/onboarding?email=${info.email}`,
        });
      }, 1000);
    });
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === EXTENSION_MESSAGE_TYPE.setToken) {
    chrome.storage.local.set({ token: message.token }, () => {
      console.log('Token saved!');
    });
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === EXTENSION_MESSAGE_TYPE.logout) {
    chrome.storage.local.remove('token', () => {
      console.log('Token removed!');
    });
  }
});
