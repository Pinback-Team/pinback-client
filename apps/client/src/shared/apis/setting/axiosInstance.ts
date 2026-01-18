import axios from 'axios';

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

    const noAuthNeeded = [
      '/api/v1/auth/token',
      '/api/v2/auth/signup',
      '/api/v2/auth/google',
    ];

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

      // localStorage.removeItem('token');
      window.location.href = '/onboarding?step=SOCIAL_LOGIN';

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default apiRequest;
