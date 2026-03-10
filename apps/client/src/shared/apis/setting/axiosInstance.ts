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

// Axios 인스턴스
const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiRequest.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');

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
      originalRequest._retry = true;

      try {
        const res = await reissueToken();

        const newAccessToken = res.data.data.token;
        localStorage.setItem('token', newAccessToken);

        window.postMessage(
          { type: 'SET_TOKEN', token: newAccessToken },
          window.location.origin
        );

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiRequest(originalRequest);
      } catch (reissueError) {
        console.error('토큰 재발급 실패. 다시 로그인해주세요.', reissueError);

        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/onboarding?step=SOCIAL_LOGIN';

        return Promise.reject(reissueError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiRequest;
