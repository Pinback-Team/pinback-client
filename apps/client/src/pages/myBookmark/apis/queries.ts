import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  getBookmarkArticles,
  getBookmarkUnreadArticles,
  getCategoryBookmarkArticles,
} from './axios';
import {
  BookmarkArticleResponse,
  CategoryBookmarkArticleResponse,
  UnreadBookmarkArticleResponse,
} from '@pages/myBookmark/types/api';

export const useGetBookmarkArticles = (
  page: number,
  size: number
): UseQueryResult<BookmarkArticleResponse, AxiosError> => {
  return useQuery({
    queryKey: ['bookmarkReadArticles', page, size],
    queryFn: () => getBookmarkArticles(page, size),
  });
};

export const useGetBookmarkUnreadArticles = (
  page: number,
  size: number
): UseQueryResult<UnreadBookmarkArticleResponse, AxiosError> => {
  return useQuery({
    queryKey: ['bookmarkUnreadArticles', page, size],
    queryFn: () => getBookmarkUnreadArticles(page, size),
  });
};

export const useGetCategoryBookmarkArticles = (
  categoryId: string | null,
  page: number,
  size: number
): UseQueryResult<CategoryBookmarkArticleResponse, AxiosError> => {
  return useQuery({
    queryKey: ['categoryBookmarkArticles', categoryId, page, size],
    queryFn: () => getCategoryBookmarkArticles(categoryId, page, size),
    enabled: !!categoryId,
  });
};
