import axios from 'axios';

// Axios 인스턴스
const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshToken = async (email: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/v1/auth/token`,
      {
        params: { email },
      }
    );

    const newToken = response.data.data?.token || response.data.token;

    if (newToken) {
      localStorage.setItem('token', newToken);
      return newToken;
    }

    throw new Error('토큰 재발급 실패');
  } catch (error) {
    console.error('토큰 재발급 실패:', error);
    throw error;
  }
};

// 요청 인터셉터
apiRequest.interceptors.request.use(async (config) => {
  const noAuthNeeded = ['/api/v1/auth/token', '/api/v1/auth/signup'];
  const isNoAuth = noAuthNeeded.some((url) => config.url?.includes(url));

  if (!isNoAuth) {
    let token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (email) {
      try {
        token = await refreshToken(email);
      } catch (err) {
        console.error('요청 인터셉터에서 토큰 재발급 실패:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        window.location.href = '/onboarding';
        throw err;
      }
    } else {
      console.error('토큰이 없습니다. 온보딩을 먼저 완료해주세요.');
      throw new Error('토큰이 없습니다. 온보딩을 먼저 완료해주세요.');
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 응답 인터셉터
apiRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const noAuthNeeded = ['/api/v1/auth/token', '/api/v1/auth/signup'];
    const isNoAuth = noAuthNeeded.some((url) =>
      originalRequest.url?.includes(url)
    );

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry &&
      !isNoAuth
    ) {
      originalRequest._retry = true;

      try {
        const email = localStorage.getItem('email');

        if (email) {
          const newToken = await refreshToken(email);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiRequest(originalRequest);
        } else {
          console.error(
            '사용자 이메일이 없습니다. 온보딩을 다시 완료해주세요.'
          );
          localStorage.removeItem('token');
          window.location.href = '/onboarding';
        }
      } catch (refreshError) {
        console.error('토큰 재발급 실패:', refreshError);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        window.location.href = '/onboarding';
      }
    }

    return Promise.reject(error);
  }
);

export default apiRequest;
