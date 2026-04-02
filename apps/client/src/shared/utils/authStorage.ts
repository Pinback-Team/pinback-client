const AUTH_STORAGE_KEYS = {
  token: 'token',
  refreshToken: 'refreshToken',
  email: 'email',
  userId: 'userId',
  hasJob: 'hasJob',
} as const;

export const authStorage = {
  getAccessToken: () => localStorage.getItem(AUTH_STORAGE_KEYS.token),
  hasAccessToken: () => !!localStorage.getItem(AUTH_STORAGE_KEYS.token),
  setAccessToken: (token: string) =>
    localStorage.setItem(AUTH_STORAGE_KEYS.token, token),
  setRefreshToken: (refreshToken: string) =>
    localStorage.setItem(AUTH_STORAGE_KEYS.refreshToken, refreshToken),
  setHasJob: (hasJob: boolean) =>
    localStorage.setItem(AUTH_STORAGE_KEYS.hasJob, String(hasJob)),
  setUserIdentity: (email: string, userId: string) => {
    localStorage.setItem(AUTH_STORAGE_KEYS.email, email);
    localStorage.setItem(AUTH_STORAGE_KEYS.userId, userId);
  },
  clearSession: () => {
    Object.values(AUTH_STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  },
};
