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

export const getAcorns = async () => {
  const now = formatLocalDateTime(new Date());
  const { data } = await apiRequest.get('/api/v1/users/acorns?now=', {
    params: { now },
  });
  return data.data;
};

export interface postSignUpRequest {
  email: string,
  remindDefault: string,
  fcmToken: string
}

export const postSignUp = async (data: postSignUpRequest) => {
  const response = await apiRequest.post('/api/v1/auth/signup', {data});
  return response.data;
};