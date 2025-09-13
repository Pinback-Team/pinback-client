import apiRequest from '@shared/apis/setting/axiosInstance';
import { formatLocalDateTime } from '@shared/utils/formatDateTime';

export const getDashboardCategories = async () => {
  const { data } = await apiRequest.get('/api/v1/categories/dashboard');
  return data.data;
};

export const postCategory = async (categoryName: string) => {
  const response = await apiRequest.post('/api/v1/categories', {
    categoryName,
  });
  return response;
};

export const putCategory = async (id: number, categoryName: string) => {
  const response = await apiRequest.put(`/api/v1/categories/${id}`, {
    categoryName,
  });
  return response;
};

export const getAcorns = async () => {
  const now = formatLocalDateTime(new Date());
  const { data } = await apiRequest.get('/api/v1/users/acorns?now=', {
    params: { now },
  });
  return data.data;
};

export interface postSignUpRequest {
  email: string;
  remindDefault: string;
  fcmToken: string | null;
}

export const postSignUp = async (responsedata: postSignUpRequest) => {
  const { data } = await apiRequest.post('/api/v1/auth/signup', responsedata);
  return data;
};

export const putArticleReadStatus = async (articleId: number) => {
  const { data } = await apiRequest.put(
    `/api/v1/articles/${articleId}/readStatus`
  );
  return data;
};

export const deleteCategory = async (id: number) => {
  const response = await apiRequest.delete(`/api/v1/categories/${id}`);
  return response;
};

export const deleteRemindArticle = async (id: number) => {
  const response = await apiRequest.delete(`/api/v1/articles/${id}`);
  return response;
};
