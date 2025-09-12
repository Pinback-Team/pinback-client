import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getBookmarkReadArticles, getBookmarkUnreadArticles } from './axios';
import {
  BookmarkArticleResponse,
  UnreadBookmarkArticleResponse,
} from '@pages/myBookmark/types/api';

export const useGetBookmarkReadArticles = (
  page: number,
  size: number
): UseQueryResult<BookmarkArticleResponse, AxiosError> => {
  return useQuery({
    queryKey: ['bookmarkReadArticles', page, size],
    queryFn: () => getBookmarkReadArticles(page, size),
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
