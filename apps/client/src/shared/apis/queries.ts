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
  putEditArticle,
  putCategory,
  putArticleReadStatus,
  getArticleDetail,
  getAcorns,
  deleteRemindArticle,
  getGoogleProfile,
  getMyProfile,
} from '@shared/apis/axios';
import { AxiosError } from 'axios';
import {
  DashboardCategoriesResponse,
  AcornsResponse,
  EditArticleRequest,
  ArticleReadStatusResponse,
  ArticleDetailResponse,
} from '@shared/types/api';
import { fetchOGData } from '@shared/utils/fetchOgData';

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
    mutationFn: ({
      categoryName,
      isPublic,
    }: {
      categoryName: string;
      isPublic: boolean;
    }) => postCategory(categoryName, isPublic),
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
        const sendTokenToExtension = (token: string) => {
          window.postMessage(
            {
              type: 'SET_TOKEN',
              token,
            },
            window.location.origin
          );
        };
        sendTokenToExtension(newToken);
      }
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

export const useGetArticleDetail = (): UseMutationResult<
  ArticleDetailResponse,
  AxiosError,
  number
> => {
  return useMutation({
    mutationFn: (articleId: number) => getArticleDetail(articleId),
  });
};

export const usePutEditArticle = () => {
  return useMutation({
    mutationFn: ({
      articleId,
      editArticleData,
    }: {
      articleId: number;
      editArticleData: EditArticleRequest;
    }) => putEditArticle(articleId, editArticleData),
  });
};

export const useGetPageMeta = (url: string) => {
  return useQuery({
    queryKey: ['ogMeta', url],
    queryFn: () => fetchOGData(url),
    enabled: !!url,
    staleTime: Infinity,
    retry: false,
  });
};

export const useGetGoogleProfile = () => {
  return useQuery({
    queryKey: ['googleProfile'],
    queryFn: getGoogleProfile,
    staleTime: Infinity,
  });
};

export function useGetMyProfile() {
  return useQuery({
    queryKey: ['myProfile'],
    queryFn: getMyProfile,
  });
}
