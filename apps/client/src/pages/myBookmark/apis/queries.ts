import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import {
  getBookmarkArticles,
  getBookmarkUnreadArticles,
  getCategoryBookmarkArticles,
} from './axios';

export const useGetBookmarkArticles = () => {
  return useSuspenseInfiniteQuery({
    queryKey: ['bookmarkReadArticles'],
    queryFn: ({ pageParam = 0 }) => getBookmarkArticles(pageParam, 20),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.articles.length === 0 ? undefined : allPages.length,
  });
};

export const useGetBookmarkUnreadArticles = () => {
  return useSuspenseInfiniteQuery({
    queryKey: ['bookmarkUnreadArticles'],
    queryFn: ({ pageParam = 0 }) => getBookmarkUnreadArticles(pageParam, 20),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.articles.length === 0 ? undefined : allPages.length,
  });
};

export const useGetCategoryBookmarkArticles = (
  categoryId: string | null,
  readStatus: boolean | null
) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['categoryBookmarkArticles', readStatus, categoryId],

    queryFn: ({ pageParam = 0 }) => {
      if (!categoryId) return null;
      return getCategoryBookmarkArticles(categoryId, readStatus, pageParam, 20);
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.articles.length === 0) return undefined;
      return allPages.length;
    },
  });
};
