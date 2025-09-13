import apiRequest from '@shared/apis/setting/axiosInstance';

export const getRemindArticles = async (
  nowDate: string,
  readStatus: boolean,
  page: number,
  size: number
) => {
  const { data } = await apiRequest.get(
    `/api/v1/articles/remind?now=${nowDate}&readStatus=${readStatus}&page=${page}&size=${size}`
  );
  return data.data;
};

export const deleteRemindArticle = async (id: number) => {
  const response = await apiRequest.post(`/api/v1/articles/${id}`);
  return response;
};
