import apiRequest from '@shared/apis/setting/axiosInstance';

export const getBookmarkArticles = async (page: number, size: number) => {
  const { data } = await apiRequest.get(
    `/api/v1/articles?page=${page}&size=${size}`
  );
  return data.data;
};

export const getBookmarkUnreadArticles = async (page: number, size: number) => {
  const { data } = await apiRequest.get(
    `/api/v1/articles/unread?page=${page}&size=${size}`
  );
  return data.data;
};

export const getCategoryBookmarkArticles = async (
  categoryId: string | null,
  readStatus: boolean | null,
  page: number,
  size: number
) => {
  if (readStatus === null) {
    const { data } = await apiRequest.get(
      `/api/v1/articles/category?categoryId=${categoryId}&page=${page}&size=${size}`
    );
    return data.data;
  } else {
    const { data } = await apiRequest.get(
      `/api/v1/articles/category?categoryId=${categoryId}&read-status=${readStatus}&page=${page}&size=${size}`
    );
    return data.data;
  }
};
