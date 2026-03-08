import {
  getArticleDetail,
  getArticleSaved,
  getCategoriesExtension,
  getRemindTime,
  postArticle,
  PostArticleRequest,
  postCategories,
  postCategoriesRequest,
  putArticle,
  PutArticleRequest,
} from '@apis/axios';
import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';

export const usePostArticle = () => {
  return useMutation({
    mutationFn: (data: PostArticleRequest) => postArticle(data),
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

export const useGetArticleDetail = (articleId?: number) => {
  return useQuery({
    queryKey: ['articleDetail', articleId],
    queryFn: () => getArticleDetail(articleId!),
    enabled: !!articleId,
  });
};
