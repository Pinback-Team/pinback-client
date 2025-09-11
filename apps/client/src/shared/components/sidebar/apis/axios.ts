import apiRequest from '@shared/apis/axiosInstance';

export const getDashboardCategories = async () => {
  const { data } = await apiRequest.get('/api/v1/categories/dashboard');
  return data;
};

export const postCategory = async (categoryName: string) => {
  const response = await apiRequest.post('/api/v1/categories', {
    categoryName,
  });
  return response;
};
