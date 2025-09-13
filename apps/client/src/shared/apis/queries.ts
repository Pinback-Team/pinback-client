import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import {
  deleteCategory,
  getDashboardCategories,
  postCategory,
  postSignUp,
  postSignUpRequest,
  putCategory,
  getAcorns,
  putArticleReadStatus,
  deleteRemindArticle,
} from '@shared/apis/axios';
import { AxiosError } from 'axios';
import {
  DashboardCategoriesResponse,
  AcornsResponse,
  ArticleReadStatusResponse,
} from '@shared/types/api';

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
export const usePutCategory = () => {
  return useMutation({
    mutationFn: ({ id, categoryName }: { id: number; categoryName: string }) =>
      putCategory(id, categoryName),
  });
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: (id: number) => deleteCategory(id),
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
      const newToken = data?.data?.token || data?.token;

      if (newToken) {
        localStorage.setItem('token', newToken);
      }

      console.log('회원가입 성공:', data);
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
    },
  });
};

export const usePutArticleReadStatus = (): UseMutationResult<
  ArticleReadStatusResponse,
  AxiosError,
  number
> => {
  return useMutation({
    mutationFn: (articleId: number) => putArticleReadStatus(articleId),
  });
};

export const useDeleteRemindArticle = () => {
  return useMutation({
    mutationFn: (id: number) => deleteRemindArticle(id),
  });
};
