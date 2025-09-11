import axios from 'axios';

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

localStorage.setItem("accessToken", 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwaW5iYWNrIiwiaWQiOiI4NjA1NTBiMS1kZDBhLTQyMjMtYjM4OS0wNTEwYWU3MmNkMzUiLCJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTc1NzYyOTAyMn0.qm-zqkuG2rpLlbUKJd9lUdh-4SStittgzXiwBeUMzA6NuKh_aEJmgoVInhUU-VSFtTlXP8eO9Ivao5K29LCRJA');
apiRequest.interceptors.request.use((config) => {
  // signup은 토큰 필요 없음
  if (config.url !== "/auth/signup") {
    const token = localStorage.getItem("accessToken"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
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