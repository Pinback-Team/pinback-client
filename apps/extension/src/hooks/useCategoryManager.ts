import { useState } from "react";
import { usePostCategories, useGetCategoriesExtension } from "@apis/query/queries";
import type { Category } from "@shared-types/types";
import { AxiosError } from "axios";

export const useCategoryManager = () => {
  const { data: categoryData } = useGetCategoriesExtension();
  const { mutate: postCategories } = usePostCategories();

  const [categoryTitle, setCategoryTitle] = useState("");
  const [isPopError, setIsPopError] = useState(false);
  const [errorTxt, setErrorTxt] = useState("");

  const options =
    categoryData?.data?.categories?.map((c: Category) => c.categoryName) ?? [];

  const saveCategory = (onSuccess?: (category: Category) => void) => {
    if (categoryTitle.length > 20) {
      setIsPopError(true);
      setErrorTxt("20자 이내로 작성해주세요");
      return;
    }

    postCategories(
      { categoryName: categoryTitle },
      {
        onSuccess: (res) => {
          const newCategory: Category = {
            categoryId: res.data.categoryId,
            categoryName: categoryTitle,
            categoryColor: res.data.categoryColor ?? "#000000",
          };
          onSuccess?.(newCategory); 
          resetPopup();
        },
        onError: (err: AxiosError<{ code: string; message: string }>) => {
          alert(err.response?.data?.message ?? "카테고리 추가 중 오류가 발생했어요 😢");
        },
      }
    );
  };

  const resetPopup = () => {
    setCategoryTitle("");
    setIsPopError(false);
    setErrorTxt("");
  };

  return {
    options,
    categoryTitle,
    setCategoryTitle,
    isPopError,
    errorTxt,
    saveCategory,
    resetPopup,
  };
};
