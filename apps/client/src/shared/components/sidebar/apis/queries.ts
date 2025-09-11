import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getDashboardCategories } from '@shared/components/sidebar/apis/axios';
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
