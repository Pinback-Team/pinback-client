import { authStorage } from '@shared/utils/authStorage';
import { extensionBridge } from '@shared/utils/extensionBridge';
import axios from 'axios';

const noAuthNeeded = [
  '/api/v1/auth/token',
  '/api/v3/auth/signup',
  '/api/v3/auth/google',
  '/api/v3/auth/reissue',
];

const reissueToken = async () => {
  return await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/v3/auth/reissue`,
    {},
    {
      withCredentials: true,
    }
  );
};

const syncAccessToken = (token: string) => {
  authStorage.setAccessToken(token);
  extensionBridge.syncToken(token);
};

const clearAuthSessionAndRedirect = () => {
  authStorage.clearSession();
  extensionBridge.logout();
  window.location.href = '/onboarding?step=SOCIAL_LOGIN';
};

// 대기열 패턴을 위한 상태 변수 선언
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// 대기 중인 요청들을 일괄 실행하고 큐를 비우는 함수
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// 대기열에 요청을 추가하는 함수
const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiRequest.interceptors.request.use(async (config) => {
  const token = authStorage.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 응답 인터셉터
apiRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isNoAuth = noAuthNeeded.some((url) =>
      originalRequest.url?.includes(url)
    );

    const isLoginPage = window.location.pathname.startsWith('/login');

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry &&
      !isNoAuth &&
      !isLoginPage
    ) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiRequest(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await reissueToken();
        const newAccessToken = res.data?.data?.token;

        if (!newAccessToken) {
          throw new Error('토큰 재발급 응답에 access token이 없습니다.');
        }

        syncAccessToken(newAccessToken);

        // 토큰 갱신 성공 처리
        isRefreshing = false;
        onRefreshed(newAccessToken);

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiRequest(originalRequest);
      } catch (reissueError) {
        console.error('토큰 재발급 실패. 다시 로그인해주세요.', reissueError);

        // 토큰 갱신 실패 처리
        isRefreshing = false;
        refreshSubscribers = [];
        clearAuthSessionAndRedirect();

        return Promise.reject(reissueError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiRequest;
