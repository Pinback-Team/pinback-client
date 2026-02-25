import {
  useQuery,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import {
  getBookmarkArticles,
  getBookmarkArticlesCount,
  getCategoryBookmarkArticles,
  getCategoryBookmarkArticlesCount,
} from './axios';
import { BookmarkArticlesResponse } from '../types/api';

export const useGetBookmarkArticles = (readStatus: boolean | null) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['bookmarkArticles', readStatus],
    queryFn: ({ pageParam = 0 }) =>
      getBookmarkArticles(readStatus, Number(pageParam), 20),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.articles.length === 0 ? undefined : allPages.length,
  });
};

export const useGetBookmarkArticlesCount = () => {
  return useSuspenseQuery({
    queryKey: ['bookmarkArticlesCount'],
    queryFn: getBookmarkArticlesCount,
  });
};

export const useGetCategoryBookmarkArticles = (
  categoryId: string | null,
  readStatus: boolean | null
) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['categoryBookmarkArticles', readStatus, categoryId],
    queryFn: ({ pageParam = 0 }) => {
      if (!categoryId)
        return Promise.resolve<BookmarkArticlesResponse>({
          totalArticleCount: 0,
          unreadArticleCount: 0,
          articles: [],
        });
      return getCategoryBookmarkArticles(
        categoryId,
        readStatus,
        Number(pageParam),
        20
      );
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.articles.length === 0) return undefined;
      return allPages.length;
    },
  });
};

export const useGetCategoryBookmarkArticlesCount = (
  categoryId: string | null
) => {
  return useQuery({
    queryKey: ['categoryBookmarkArticlesCount', categoryId],
    queryFn: () => getCategoryBookmarkArticlesCount(categoryId!),
    enabled: !!categoryId,
  });
};
