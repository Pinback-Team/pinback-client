import axios from 'axios';

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getTokenFromStorage = () => {
  return new Promise<string | undefined>((resolve) => {
    chrome.storage.local.get('token', (result) => {
      resolve(result.token);
    });
  });
};

apiRequest.interceptors.request.use(async (config) => {
  const token = await getTokenFromStorage();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// TODO: 환경변수로 분리

let isRedirecting = false;

apiRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const noAuthNeeded = [
      '/api/v1/auth/token',
      '/api/v3/auth/signup',
      '/api/v2/auth/google',
    ];
    const isNoAuth = noAuthNeeded.some((url) =>
      originalRequest.url?.includes(url)
    );

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !isNoAuth
    ) {
      if (!isRedirecting) {
        isRedirecting = true;
      }
    }

    return Promise.reject(error);
  }
);

export default apiRequest;
