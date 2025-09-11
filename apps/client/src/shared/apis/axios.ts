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

export const patchCategory = async (id: number, categoryName: string) => {
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
