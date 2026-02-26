import apiRequest from '@shared/apis/setting/axiosInstance';

export const getJobPinsArticles = async (page: number, size: number) => {
  const { data } = await apiRequest.get('/api/v3/articles/shared/job', {
    params: {
      page,
      size,
    },
  });

  return data.data;
};
