import { EXTENSION_MESSAGE_TYPE } from '@pinback/contracts/extension-messages';

const ALLOWED_ORIGINS = __ALLOWED_ORIGINS__;

if (ALLOWED_ORIGINS.length === 0) {
  console.warn(
    '[Pinback] 허용된 도메인(ALLOWED_ORIGINS) 설정이 비어 있습니다. 토큰 동기화가 작동하지 않으니 .env 파일을 확인해주세요.'
  );
}

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
