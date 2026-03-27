const AUTH_STORAGE_KEYS = {
  token: 'token',
  refreshToken: 'refreshToken',
  email: 'email',
  userId: 'userId',
  hasJob: 'hasJob',
  // TODO: 유저 프로퍼티 추가 시 전용 API + AmplitudeProvider 패턴으로 리팩토링 필요
  jobRole: 'jobRole',
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
  setJobRole: (jobRole: string) =>
    localStorage.setItem(AUTH_STORAGE_KEYS.jobRole, jobRole),
  getJobRole: () => localStorage.getItem(AUTH_STORAGE_KEYS.jobRole),
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
