import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import { getDashboardCategories, postCategory } from '@shared/apis/axios';
import { AxiosError } from 'axios';
import { DashboardCategoriesResponse } from '@shared/types/api';

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
