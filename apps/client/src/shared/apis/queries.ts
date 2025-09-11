import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  getDashboardCategories,
  postCategory,
  patchCategory,
} from '@shared/apis/axios';
import { AxiosError } from 'axios';
import { DashboardCategoriesResponse, AcornsResponse } from '@shared/types/api';
import { getAcorns } from './axios';

export const useGetDashboardCategories = (): UseQueryResult<
  DashboardCategoriesResponse,
  AxiosError
> => {
  return useQuery({
    queryKey: ['dashboardCategories'],
    queryFn: () => getDashboardCategories(),
  });
};

export const usePostCategory = () => {
  return useMutation({
    mutationFn: (categoryName: string) => postCategory(categoryName),
  });
};
export const usePatchCategory = () => {
  return useMutation({
    mutationFn: ({ id, categoryName }: { id: number; categoryName: string }) =>
      patchCategory(id, categoryName),
  });
};

export const useGetArcons = (): UseQueryResult<AcornsResponse, AxiosError> => {
  return useQuery({
    queryKey: ['arcons'],
    queryFn: () => getAcorns(),
  });
};
