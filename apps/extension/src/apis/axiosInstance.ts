import axios from 'axios';

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const fetchToken = async (email?: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/v1/auth/token`,
    {
      params: { email },
    }
  );
  const newToken = response.data.data.token;
  chrome.storage.local.set({ token: newToken }, () => {
    console.log('Token re-saved to chrome storage');
  });
  return newToken;
};

apiRequest.interceptors.request.use(async (config) => {
  const noAuthNeeded = ['/api/v1/auth/token', '/api/v1/auth/signup'];
  const isNoAuth = noAuthNeeded.some((url) => config.url?.includes(url));

  if (isNoAuth) return config;

  const email = await new Promise<string | undefined>((resolve) => {
    chrome.storage.local.get('email', (result) => resolve(result.email));
  });

  let token = await new Promise<string | undefined>((resolve) => {
    chrome.storage.local.get('token', (result) => {
      resolve(result.token);
    });
  });

  if (!isNoAuth) {
    if (email) {
      try {
        token = await fetchToken(email);
      } catch (err) {
        console.error('요청 인터셉터에서 토큰 재발급 실패:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        window.location.href = '/onboarding';
        throw err;
      }
    } else {
      throw new Error('토큰이 없습니다. 온보딩을 먼저 완료해주세요.');
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

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
      const newToken = await fetchToken('test@gmail.com');
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return apiRequest(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default apiRequest;
