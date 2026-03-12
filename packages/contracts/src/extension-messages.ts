export const EXTENSION_MESSAGE_TYPE = {
  setToken: 'SET_TOKEN',
  logout: 'Extension-Logout',
} as const;

export type ExtensionMessageType =
  (typeof EXTENSION_MESSAGE_TYPE)[keyof typeof EXTENSION_MESSAGE_TYPE];

export type ExtensionMessage =
  | {
      type: typeof EXTENSION_MESSAGE_TYPE.setToken;
      token: string;
    }
  | {
      type: typeof EXTENSION_MESSAGE_TYPE.logout;
    };
