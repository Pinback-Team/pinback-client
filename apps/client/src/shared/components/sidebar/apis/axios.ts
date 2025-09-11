import apiRequest from '@shared/apis/axiosInstance';

export const getDashboardCategories = async () => {
  const { data } = await apiRequest.get('/api/v1/categories/dashboard');
  return data;
};
