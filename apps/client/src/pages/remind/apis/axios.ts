import apiRequest from '@shared/apis/setting/axiosInstance';

export const getRemindArticles = async (
  nowDate: string,
  readStatus: boolean,
  page: number,
  size: number
) => {
  const { data } = await apiRequest.get(`/api/v2/articles/remind`, {
    params: {
      now: nowDate,
      'read-status': readStatus,
      page,
      size,
    },
  });

  return data.data;
};
