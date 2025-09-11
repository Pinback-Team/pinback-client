import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getAcorns } from './axios';
import { AxiosError } from 'axios';
import { AcornsResponse } from '@pages/level/types/api';

export const useGetArcons = (): UseQueryResult<AcornsResponse, AxiosError> => {
  return useQuery({
    queryKey: ['arcons'],
    queryFn: () => getAcorns(),
  });
};
