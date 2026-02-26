import { useInfiniteQuery } from '@tanstack/react-query';
import { getJobPinsArticles } from './axios';

export const useGetJobPinsArticles = () => {
  return useInfiniteQuery({
    queryKey: ['jobPinsArticles'],
    queryFn: ({ pageParam = 0 }) => getJobPinsArticles(pageParam, 20),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.articles.length === 0) {
        return undefined;
      }

      return allPages.length;
    },
  });
};
