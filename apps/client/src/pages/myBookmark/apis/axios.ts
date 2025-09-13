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
