import apiRequest from '@shared/apis/setting/axiosInstance';
import { JobPinsResponse } from '@pages/jobPins/types/api';

interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

export const getJobPinsArticles = async (
  page: number,
  size: number
): Promise<JobPinsResponse> => {
  const { data } = await apiRequest.get('/api/v3/articles/shared/job', {
    params: {
      page,
      size,
    },
  });

  return (data as ApiResponse<JobPinsResponse>).data;
};
