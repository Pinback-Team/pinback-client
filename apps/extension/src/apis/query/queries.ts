import { useMutation,useQuery } from "@tanstack/react-query";
import { postArticle, PostArticleRequest,postSignup, postSignupRequest, getCategoriesExtension, postCategories, postCategoriesRequest, getRemindTime, getArticleSaved, patchArticle, PatchArticleRequest} from "../axiosInstance";

export const usePostArticle = () => {
  return useMutation({
    mutationFn: (data: PostArticleRequest) => postArticle(data),
    onSuccess: (data) => {
      console.log("저장 성공:", data);
    },
    onError: (error) => {
      console.error("저장 실패:", error);
    },
  });
};

export const usePostSignup = () => {
  return useMutation({
    mutationFn: (data: postSignupRequest) => postSignup(data),
    onSuccess: (data) => {
      console.log("회원가입 성공:", data);
    },
    onError: (error) => {
      console.error("회원가입 실패:", error);
    },
  });
}

export const usePostCategories = () => {
  return useMutation({
    mutationFn: (data: postCategoriesRequest) => postCategories(data),
    onSuccess: (data) => {
      console.log("카테고리 저장", data);
    },
    onError: (error) => {
      console.error("카테고리 저장 실패", error);
    },
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

export const usePatchArticle = () => {
  return useMutation({
    mutationFn: ({ articleId, data }: { articleId: number; data: PatchArticleRequest }) =>
      patchArticle(articleId, data),
    onSuccess: (data) => {
      console.log("아티클 수정 성공:", data);
    },
    onError: (error) => {
      console.error("아티클 수정 실패:", error);
    },
  });
};