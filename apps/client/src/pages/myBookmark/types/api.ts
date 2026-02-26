interface Category {
  categoryId: number;
  categoryName: string;
  categoryColor: string;
}

export interface BookmarkArticle {
  articleId: number;
  url: string;
  title: string | null;
  thumbnailUrl: string | null;
  memo: string | null;
  createdAt: string;
  isRead: boolean;
  category?: Category;
}

// 북마크 조회(v3)
export interface BookmarkArticlesResponse {
  totalArticleCount: number;
  unreadArticleCount: number;
  articles: BookmarkArticle[];
}

export interface CategoryBookmarkArticleResponse {
  totalArticleCount: number;
  unreadArticleCount: number;
  categoryName: string;
  articles: BookmarkArticle[];
}

// 나의 북마크 카운트 조회
export interface BookmarkArticlesCountResponse {
  totalArticleCount: number;
  readArticleCount: number;
  unreadArticleCount: number;
}
