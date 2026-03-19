import { EXTENSION_MESSAGE_TYPE } from '@pinback/contracts/extension-messages';

const ALLOWED_ORIGINS = __ALLOWED_ORIGINS__;

window.addEventListener('message', (event) => {
  if (event.source !== window) return;

  if (!ALLOWED_ORIGINS.includes(event.origin)) return;

  const { type, token } = event.data;

  if (type === EXTENSION_MESSAGE_TYPE.setToken) {
    chrome.runtime.sendMessage({
      type: EXTENSION_MESSAGE_TYPE.setToken,
      token,
    });

    chrome.storage.local.set({ token }, () => {
      console.log(`[${event.origin}] Token saved!`);
    });
  }

  // 토큰 삭제 (로그아웃)
  if (type === EXTENSION_MESSAGE_TYPE.logout) {
    chrome.storage.local.remove('token', () => {
      console.log(`[${event.origin}] Token removed!`);
    });
  }
});
