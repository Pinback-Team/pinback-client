import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  postArticle,
  PostArticleRequest,
  postSignup,
  postSignupRequest,
  getCategoriesExtension,
  postCategories,
  postCategoriesRequest,
  getRemindTime,
  getArticleSaved,
  putArticle,
  PutArticleRequest,
} from '@apis/axios';

export const usePostArticle = () => {
  return useMutation({
    mutationFn: (data: PostArticleRequest) => postArticle(data),
  });
};

export const usePostSignup = () => {
  return useMutation({
    mutationFn: (data: postSignupRequest) => postSignup(data),
  });
};

export const usePostCategories = () => {
  return useMutation({
    mutationFn: (data: postCategoriesRequest) => postCategories(data),
  });
};

type CategoriesResponse = Awaited<ReturnType<typeof getCategoriesExtension>>;

export const useGetCategoriesExtension = (
  options?: Partial<UseQueryOptions<CategoriesResponse>>
) => {
  return useQuery<CategoriesResponse>({
    queryKey: ['categoriesExtension'],
    queryFn: getCategoriesExtension,
    ...options, // ✅ 외부에서 온 enabled 같은 값 덮어쓰기
  });
};

export const useGetRemindTime = () => {
  return useQuery({
    queryKey: ['remindTime'],
    queryFn: getRemindTime,
  });
};

export const useGetArticleSaved = (url: string) => {
  return useQuery({
    queryKey: ['articleSaved', url],
    queryFn: () => getArticleSaved(url),
    enabled: !!url,
  });
};

export const usePutArticle = () => {
  return useMutation({
    mutationFn: ({
      articleId,
      data,
    }: {
      articleId: number;
      data: PutArticleRequest;
    }) => putArticle(articleId, data),
  });
};
