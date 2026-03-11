import {
  BookmarkArticlesCountResponse,
  BookmarkArticlesResponse,
  CategoryBookmarkArticleResponse,
} from '@pages/myBookmark/types/api';
import apiRequest from '@shared/apis/setting/axiosInstance';

export const getBookmarkArticles = async (
  readStatus: boolean | null,
  page: number,
  size: number
): Promise<BookmarkArticlesResponse> => {
  const readStatusQuery =
    readStatus === null ? '' : `&read-status=${readStatus}`;
  const { data } = await apiRequest.get(
    `/api/v3/articles?page=${page}&size=${size}${readStatusQuery}`
  );
  return data.data;
};

export const getBookmarkArticlesCount =
  async (): Promise<BookmarkArticlesCountResponse> => {
    const { data } = await apiRequest.get(`/api/v3/articles/count`);
    return data.data;
  };

export const getCategoryBookmarkArticles = async (
  categoryId: string | null,
  readStatus: boolean | null,
  page: number,
  size: number
): Promise<CategoryBookmarkArticleResponse> => {
  const readStatusQuery =
    readStatus === null ? '' : `&read-status=${readStatus}`;
  const { data } = await apiRequest.get(
    `/api/v3/articles/category?category-id=${categoryId}&page=${page}&size=${size}${readStatusQuery}`
  );
  return data.data;
};

export const getCategoryBookmarkArticlesCount = async (
  categoryId: string
): Promise<BookmarkArticlesCountResponse> => {
  const { data } = await apiRequest.get(
    `/api/v3/articles/category/count?category-id=${categoryId}`
  );
  return data.data;
};
