import { EXTENSION_MESSAGE_TYPE } from '@pinback/contracts/extension-messages';

export const extensionBridge = {
  syncToken: (token: string) => {
    window.postMessage(
      {
        type: EXTENSION_MESSAGE_TYPE.setToken,
        token,
      },
      window.location.origin
    );
  },
  logout: () => {
    window.postMessage(
      {
        type: EXTENSION_MESSAGE_TYPE.logout,
      },
      window.location.origin
    );
  },
};
