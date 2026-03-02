import {
  useQuery,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { CategoryBookmarkArticleResponse } from '../types/api';
import {
  getBookmarkArticles,
  getBookmarkArticlesCount,
  getCategoryBookmarkArticles,
  getCategoryBookmarkArticlesCount,
} from './axios';

const PAGE_SIZE = 20;

export const useGetBookmarkArticles = (readStatus: boolean | null) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['bookmarkArticles', readStatus],
    queryFn: ({ pageParam = 0 }) =>
      getBookmarkArticles(readStatus, Number(pageParam), 20),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.articles.length < PAGE_SIZE ? undefined : allPages.length,
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
        return Promise.resolve<CategoryBookmarkArticleResponse>({
          totalArticleCount: 0,
          unreadArticleCount: 0,
          categoryName: '',
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
      if (!lastPage) return undefined;
      return lastPage.articles.length < PAGE_SIZE ? undefined : allPages.length;
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
