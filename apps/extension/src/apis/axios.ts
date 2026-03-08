import apiRequest from './axiosInstance';
export interface PostArticleRequest {
  url: string;
  categoryId: number;
  memo?: string | null;
  remindTime?: string | null;
}

export const postArticle = async (data: PostArticleRequest) => {
  const response = await apiRequest.post('/api/v3/articles', data);
  return response.data;
};

export interface postSignupRequest {
  email: string;
  remindDefault: string;
  fcmToken: string;
}

export const postSignup = async (data: postSignupRequest) => {
  const response = await apiRequest.post('/api/v1/auth/signup', data);
  return response.data;
};

export const getCategoriesExtension = async () => {
  const response = await apiRequest.get('/api/v1/categories/extension');
  return response.data;
};
export interface postCategoriesRequest {
  categoryName: string;
  isPublic: boolean;
}

export const postCategories = async (data: postCategoriesRequest) => {
  const response = await apiRequest.post('/api/v3/categories', data);

  return response.data;
};

export const getRemindTime = async () => {
  const now = new Date().toISOString().split('.')[0];

  const response = await apiRequest.get('/api/v1/users/remind-time', {
    params: { now },
  });

  return response.data;
};

export const getArticleSaved = async (url: string) => {
  const response = await apiRequest.get('/api/v1/articles/saved', {
    params: { url },
  });
  return response.data;
};

export interface PutArticleRequest {
  categoryId: number;
  memo: string;
  now: string;
  remindTime: string | null;
}

export const putArticle = async (
  articleId: number,
  data: PutArticleRequest
) => {
  const response = await apiRequest.put(`/api/v1/articles/${articleId}`, {
    ...data,
  });
  return response;
};

export const getArticleDetail = async (articleId: number) => {
  const response = await apiRequest.get(`/api/v3/articles/${articleId}`);
  return response.data.data;
};
