import { useInfiniteQuery } from '@tanstack/react-query';
import { JobPinsResponse } from '@pages/jobPins/types/api';
import { getJobPinsArticles } from './axios';

export const useGetJobPinsArticles = () => {
  return useInfiniteQuery<JobPinsResponse>({
    queryKey: ['jobPinsArticles'],
    queryFn: ({ pageParam = 0 }) => getJobPinsArticles(pageParam as number, 20),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.articles.length === 0) {
        return undefined;
      }

      return allPages.length;
    },
  });
};
