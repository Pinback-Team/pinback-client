import { JobPinsResponse } from '@pages/jobPins/types/api';
import apiRequest from '@shared/apis/setting/axiosInstance';

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

export interface JobPinsDetailResponse {
  articleId: number;
  ownerName: string;
  memo: string | null;
  url: string;
}

export const getJobPinsArticleDetail = async (
  articleId: number
): Promise<JobPinsDetailResponse> => {
  const { data } = await apiRequest.get(
    `/api/v3/articles/shared/job/${articleId}`
  );

  return (data as ApiResponse<JobPinsDetailResponse>).data;
};
