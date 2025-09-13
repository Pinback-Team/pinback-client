import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getRemindArticles, deleteRemindArticle } from './axios';
import { ArticleListResponse } from '@pages/remind/types/api';

export const useGetRemindArticles = (
  nowDate: string,
  readStatus: boolean,
  page: number,
  size: number
): UseQueryResult<ArticleListResponse, AxiosError> => {
  return useQuery({
    queryKey: ['remindArticles', nowDate, readStatus, page, size],
    queryFn: () => getRemindArticles(nowDate, readStatus, page, size),
  });
};

export const useDeleteRemindArticle = () => {
  return useMutation({
    mutationFn: (id: number) => deleteRemindArticle(id),
  });
};
