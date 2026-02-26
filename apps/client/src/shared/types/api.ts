export interface Category {
  id: number;
  name: string;
  unreadCount: number;
  isPublic: boolean;
}

export interface DashboardCategoriesResponse {
  categories: Category[];
}

export type AcornsResponse = {
  acornCount: number;
  nextRemind: string;
};

export interface ArticleReadStatusResponse {
  acornCount: number;
  acornCollected: boolean;
}

export interface EditArticleRequest {
  categoryId: number;
  memo: string;
  now: string;
  remindTime: string | null;
}

interface CategoryResponse {
  categoryId: number;
  categoryName: string;
  categoryColor: string;
}

export interface ArticleDetailResponse {
  articleId: number;
  url: string;
  title: string;
  thumbnailUrl: string;
  memo: string | null;
  remindAt: string | null;
  createdAt: string;
  categoryResponse: CategoryResponse;
}

export interface JobOption {
  imageUrl: string;
  job: string;
}

export interface JobsResponse {
  jobs: JobOption[];
}
