import apiRequest from '@shared/apis/setting/axiosInstance';
import { formatLocalDateTime } from '@shared/utils/formatDateTime';

export const getAcorns = async () => {
  const now = formatLocalDateTime(new Date());
  const { data } = await apiRequest.get('/api/v1/users/acorns?now=', {
    params: { now },
  });
  return data.data;
};
