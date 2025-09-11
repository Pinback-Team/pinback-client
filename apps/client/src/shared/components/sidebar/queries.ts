import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getDashboardCategories } from './axios';
import { DashboardCategoriesResponse } from './types/api';
import { AxiosError } from 'axios';

export const useGetDashboardCategories = (): UseQueryResult<
  DashboardCategoriesResponse,
  AxiosError
> => {
  return useQuery({
    queryKey: ['dashboardCategories'],
    queryFn: () => getDashboardCategories(),
  });
};
