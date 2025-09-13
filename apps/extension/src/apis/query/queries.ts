import { useMutation,useQuery } from "@tanstack/react-query";
import { postArticle, PostArticleRequest,postSignup, postSignupRequest, getCategoriesExtension, postCategories, postCategoriesRequest, getRemindTime, getArticleSaved,putArticle, PutArticleRequest} from "@apis/axios";

export const usePostArticle = () => {
  return useMutation({
    mutationFn: (data: PostArticleRequest) => postArticle(data),
  });
};

export const usePostSignup = () => {
  return useMutation({
    mutationFn: (data: postSignupRequest) => postSignup(data)
  });
}

export const usePostCategories = () => {
  return useMutation({
    mutationFn: (data: postCategoriesRequest) => postCategories(data),
  });
}
export const useGetCategoriesExtension = () => {
  return useQuery({
    queryKey: ["categoriesExtension"],
    queryFn: getCategoriesExtension,
  });
};

export const useGetRemindTime = () => {
  return useQuery({
    queryKey: ["remindTime"],
    queryFn: getRemindTime,
  });
}

export const useGetArticleSaved = (url:string) => {
  return useQuery({
    queryKey: ["articleSaved", url],
    queryFn: () => getArticleSaved(url),
    enabled: !!url, 
  });
}

export const usePutArticle = () => {
  return useMutation({
    mutationFn: ({ articleId, data }: { articleId: number; data: PutArticleRequest }) =>
      putArticle(articleId, data)
  });
};