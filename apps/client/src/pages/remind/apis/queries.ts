import { useInfiniteQuery } from '@tanstack/react-query';
import { getRemindArticles } from './axios';

export const useGetRemindArticles = (nowDate: string, readStatus: boolean) => {
  return useInfiniteQuery({
    queryKey: ['remindArticles', nowDate, readStatus],
    queryFn: ({ pageParam = 0 }) =>
      getRemindArticles(nowDate, readStatus, pageParam, 20),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.articles.length === 0) {
        return undefined;
      }
      return allPages.length;
    },
  });
};
