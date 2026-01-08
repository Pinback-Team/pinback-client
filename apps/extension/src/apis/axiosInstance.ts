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
// eslint-disable-next-line turbo/no-undeclared-env-vars
const onboardingUrl = import.meta.env.DEV
  ? 'http://localhost:5173/onboarding?step=SOCIAL_LOGIN'
  : 'https://pinback.today/onboarding?step=SOCIAL_LOGIN';

let isRedirecting = false;

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

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !isNoAuth
    ) {
      if (!isRedirecting) {
        isRedirecting = true;

        chrome.storage.local.remove(['token', 'email'], () => {});

        chrome.tabs.create({ url: onboardingUrl }, () => {
          setTimeout(() => {
            isRedirecting = false;
          }, 2000);
        });
      }
    }

    return Promise.reject(error);
  }
);

export default apiRequest;
