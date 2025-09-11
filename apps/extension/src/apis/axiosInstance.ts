import axios from 'axios';

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
// localStorage.setItem("accessToken", 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwaW5iYWNrIiwiaWQiOiI4NjA1NTBiMS1kZDBhLTQyMjMtYjM4OS0wNTEwYWU3MmNkMzUiLCJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTc1NzYyOTAyMn0.qm-zqkuG2rpLlbUKJd9lUdh-4SStittgzXiwBeUMzA6NuKh_aEJmgoVInhUU-VSFtTlXP8eO9Ivao5K29LCRJA');
// apiRequest.interceptors.request.use((config) => {
//   // signup은 토큰 필요 없음
//   if (config.url !== "/auth/signup") {
//     const token = localStorage.getItem("accessToken"); 
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// });
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
    chrome.storage.local.get('email', (result) => {
      resolve(result.email);
    });
  });

  let token = await new Promise<string | undefined>((resolve) => {
    chrome.storage.local.get('token', (result) => {
      resolve(result.token);
    });
  });

  // 토큰 없으면 fetchToken 호출
  if (!token || token === 'undefined') {
    token = await fetchToken(email);
  }

  config.headers.Authorization = `Bearer ${token}`;
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

export interface PostArticleRequest {
  url: string;
  categoryId: number;
  memo?: string | null;
  remindTime?: string | null; 
}

export const postArticle = async (data: PostArticleRequest) => {
  const response = await apiRequest.post("/articles", data);
  return response.data;
};


export interface postSignupRequest {
  email: string;
  remindDefault: string
  fcmToken: string;
}

export const postSignup = async (data: postSignupRequest) => {
  const response = await apiRequest.post("/auth/signup", data);
  return response.data;
};

export const getCategoriesExtension = async () => {
  const response = await apiRequest.get("/categories/extension");
  return response.data;
};

export interface postCategoriesRequest {
  categoryName: string;
}

export const postCategories = async (data: postCategoriesRequest) => {
  const response = await apiRequest.post("/categories", data);
  return response.data;
}

export const getRemindTime = async () => {
  const now = new Date().toISOString().split(".")[0]; 

  const response = await apiRequest.get("/users/remind-time", {
    params: { now },
  });

  return response.data;
};


export const getArticleSaved=async (url:string) => {
  const response = await apiRequest.get("/articles/saved", {
    params: { url },
  });
  return response.data;
}

export interface PutArticleRequest {
  categoryId: number;
  memo: string;
  now: string;
  remindTime: string | null;
}

export const putArticle = async (articleId: number, data: PutArticleRequest) => {
  const response = await apiRequest.put(`/articles/${articleId}`, data);
  return response.data;
};