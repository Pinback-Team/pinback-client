import axios from 'axios';

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

localStorage.setItem("accessToken", 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwaW5iYWNrIiwiaWQiOiIzZjgwOTI4Mi0zMWU2LTRlZTQtYTU3OS1lZDQyYTA3YWU1NmUiLCJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTc1NzU5MzUwMX0.N4Di7Lkmnp99BUhRgWNTi4b3oAL2LFHMl0HX-_soLZ6QkDbiysUiirlu47cGa7MeRimSygR2DPzJgCIi3DjA4A');
apiRequest.interceptors.request.use((config) => {
  // signup은 토큰 필요 없음
  if (config.url !== "/auth/signup") {
    const token = localStorage.getItem("accessToken"); // 저장해둔 토큰 불러오기
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
