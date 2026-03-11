import { JobPinsResponse } from '@pages/jobPins/types/api';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import {
  getJobPinsArticleDetail,
  getJobPinsArticles,
  JobPinsDetailResponse,
} from './axios';

const PAGE_SIZE = 20;

export const useGetJobPinsArticles = () => {
  return useInfiniteQuery<JobPinsResponse>({
    queryKey: ['jobPinsArticles'],
    queryFn: ({ pageParam = 0 }) => getJobPinsArticles(pageParam as number, 20),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.articles.length < PAGE_SIZE) {
        return undefined;
      }

      return allPages.length;
    },
  });
};

export const useGetJobPinsArticleDetail = () => {
  return useMutation<JobPinsDetailResponse, Error, number>({
    mutationFn: (articleId: number) => getJobPinsArticleDetail(articleId),
  });
};
