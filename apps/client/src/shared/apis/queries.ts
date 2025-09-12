import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import { getDashboardCategories, postCategory, postSignUp, postSignUpRequest } from '@shared/apis/axios';
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

export const useGetArcons = (): UseQueryResult<AcornsResponse, AxiosError> => {
  return useQuery({
    queryKey: ['arcons'],
    queryFn: () => getAcorns(),
  });
};

export const usePostSignUp = () => {
  return useMutation({
    mutationFn: (data: postSignUpRequest) => postSignUp(data),
    onSuccess: (data) => {
      // postSignUp에서 axios 같은 걸 리턴한다고 가정
      const newToken = data?.data?.token || data?.token;

      if (newToken) {
        localStorage.setItem("token", newToken);
      }

      console.log("회원가입 성공:", data);
    },
    onError: (error) => {
      console.error("회원가입 실패:", error);
    },
  });
};
