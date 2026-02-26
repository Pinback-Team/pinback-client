// 리마인드 전체 조회 (v3)
interface Category {
  categoryId: number;
  categoryName: string;
  categoryColor: string;
}

export interface ArticleWithCategory {
  articleId: number;
  url: string;
  title: string;
  thumbnailUrl: string;
  memo: string;
  createdAt: string;
  isRead: boolean;
  isReadAfterRemind: boolean;
  remindAt: string;
  category: Category;
}

export interface ArticleListResponse {
  hasNext: boolean;
  totalArticleCount: number;
  readArticleCount: number;
  unreadArticleCount: number;
  articles: ArticleWithCategory[];
}
