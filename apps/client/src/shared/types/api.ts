export interface Category {
  id: number;
  name: string;
  unreadCount: number;
}

export interface DashboardCategoriesResponse {
  categories: Category[];
}

export type AcornsResponse = {
  acornCount: number;
  remindDateTime: string;
};

export interface ArticleReadStatusResponse {
  acornCount: number;
  acornCollected: boolean;
}

export interface EditArticleRequest {
  categoryId: number;
  memo: string;
  now: string;
  remindTime: string;
}
