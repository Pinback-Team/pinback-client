import { useInfiniteQuery } from '@tanstack/react-query';
import {
  getBookmarkArticles,
  getBookmarkUnreadArticles,
  getCategoryBookmarkArticles,
} from './axios';

export const useGetBookmarkArticles = () => {
  return useInfiniteQuery({
    queryKey: ['bookmarkReadArticles'],
    queryFn: ({ pageParam = 0 }) => getBookmarkArticles(pageParam, 20),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.articles.length === 0) {
        return undefined;
      }
      return allPages.length;
    },
  });
};

export const useGetBookmarkUnreadArticles = () => {
  return useInfiniteQuery({
    queryKey: ['bookmarkUnreadArticles'],
    queryFn: ({ pageParam = 0 }) => getBookmarkUnreadArticles(pageParam, 20),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.articles.length === 0) {
        return undefined;
      }
      return allPages.length;
    },
  });
};

export const useGetCategoryBookmarkArticles = (
  categoryId: string | null,
  readStatus: boolean | null
) => {
  return useInfiniteQuery({
    queryKey: ['categoryBookmarkArticles', readStatus, categoryId],
    queryFn: ({ pageParam = 0 }) =>
      getCategoryBookmarkArticles(categoryId, readStatus, pageParam, 20),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.articles.length === 0) {
        return undefined;
      }
      return allPages.length;
    },
    enabled: !!categoryId,
  });
};
