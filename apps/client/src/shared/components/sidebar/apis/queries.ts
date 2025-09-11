import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  getDashboardCategories,
  postCategory,
} from '@shared/components/sidebar/apis/axios';
import { AxiosError } from 'axios';
import { DashboardCategoriesResponse } from '@shared/components/sidebar/types/api';

export const useGetDashboardCategories = (): UseQueryResult<
  DashboardCategoriesResponse,
  AxiosError
> => {
  return useQuery({
    queryKey: ['dashboardCategories'],
    queryFn: () => getDashboardCategories(),
  });
};

export const usePostCategory = (categoryName: string) => {
  return useMutation({
    mutationFn: () => postCategory(categoryName),
  });
};
