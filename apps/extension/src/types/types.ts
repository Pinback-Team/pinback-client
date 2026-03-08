export interface CategoryResponse {
  categoryId: number;
  categoryName: string;
  categoryColor: string;
}

export interface ArticleResponse {
  id: number;
  articleId: number;
  url: string;
  memo: string;
  remindAt: string | null;
  categoryResponse: CategoryResponse;
  createdAt: string;
}

export interface Category {
  categoryId: number;
  categoryName: string;
  categoryColor: string;
}
