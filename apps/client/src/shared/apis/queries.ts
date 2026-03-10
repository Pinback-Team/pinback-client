import {
  deleteCategory,
  deleteRemindArticle,
  getAcorns,
  getArticleDetail,
  getCategoryDetail,
  getDashboardCategories,
  getGoogleProfile,
  getHasJob,
  getJobs,
  getMyProfile,
  patchCategory,
  patchUserJob,
  patchUserJobRequest,
  postCategory,
  postSignUp,
  postSignUpRequest,
  putArticleReadStatus,
  putEditArticle,
} from '@shared/apis/axios';
import {
  AcornsResponse,
  ArticleDetailResponse,
  ArticleReadStatusResponse,
  CategoryDetailResponse,
  DashboardCategoriesResponse,
  EditArticleRequest,
  HasJobResponse,
  JobsResponse,
} from '@shared/types/api';
import { fetchOGData } from '@shared/utils/fetchOgData';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
  useSuspenseQuery,
} from '@tanstack/react-query';
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
export const usePatchCategory = () => {
  return useMutation({
    mutationFn: ({
      id,
      categoryName,
      isPublic,
    }: {
      id: number;
      categoryName: string;
      isPublic: boolean;
    }) => patchCategory(id, categoryName, isPublic),
  });
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: (id: number) => deleteCategory(id),
  });
};

export const useGetAcorns = (): UseQueryResult<AcornsResponse, AxiosError> => {
  return useQuery({
    queryKey: ['acorns'],
    queryFn: () => getAcorns(),
    refetchOnWindowFocus: true,
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (articleId: number) => putArticleReadStatus(articleId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['remindArticles'],
      });
      queryClient.invalidateQueries({
        queryKey: ['acorns'],
        refetchType: 'none',
      });
      queryClient.invalidateQueries({
        queryKey: ['bookmarkReadArticles'],
      });
      queryClient.invalidateQueries({
        queryKey: ['bookmarkUnreadArticles'],
      });
      queryClient.invalidateQueries({
        queryKey: ['categoryBookmarkArticles'],
      });
    },
    onError: (error) => {
      console.error('읽음 처리 실패:', error);
    },
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

export const useGetMyProfile = () => {
  return useQuery({
    queryKey: ['myProfile'],
    queryFn: getMyProfile,
  });
};

export const useGetHasJob = (
  enabled = true
): UseQueryResult<HasJobResponse, AxiosError> => {
  return useQuery({
    queryKey: ['hasJob'],
    queryFn: getHasJob,
    enabled,
  });
};

export const useGetJobs = (): UseQueryResult<JobsResponse, AxiosError> => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs,
    staleTime: Infinity,
  });
};

export const useSuspenseGetJobs = () => {
  return useSuspenseQuery({
    queryKey: ['jobs'],
    queryFn: getJobs,
    staleTime: Infinity,
  });
};

export const usePatchUserJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: patchUserJobRequest) => patchUserJob(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['hasJob'],
      });
    },
  });
};

export const useGetCategoryDetail = (): UseMutationResult<
  CategoryDetailResponse,
  AxiosError,
  number
> => {
  return useMutation({
    mutationFn: (categoryId: number) => getCategoryDetail(categoryId),
  });
};
