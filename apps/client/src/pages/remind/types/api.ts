// 리마인드 전체 조회
interface Category {
  categoryId: number;
  categoryName: string;
  categoryColor: string;
}

interface ArticleWithCategory {
  articleId: number;
  url: string;
  memo: string;
  createdAt: string;
  isRead: boolean;
  remindAt: string;
  category: Category;
}

export interface ArticleListResponse {
  readArticleCount: number;
  unreadArticleCount: number;
  articles: ArticleWithCategory[];
}
