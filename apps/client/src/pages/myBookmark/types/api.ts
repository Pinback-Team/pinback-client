interface Category {
  categoryId: number;
  categoryName: string;
  categoryColor: string;
}

export interface BookmarkArticle {
  articleId: number;
  url: string;
  memo: string;
  createdAt: string;
  isRead: boolean;
  category: Category;
}

// 북마크 전체 조회
export interface BookmarkArticleResponse {
  totalArticle: number;
  totalUnreadArticle: number;
  isNewUser: boolean;
  articles: BookmarkArticle[];
}

// 북마크 안 읽음 조회
export interface UnreadBookmarkArticleResponse {
  totalArticle: number;
  totalUnreadArticle: number;
  articles: BookmarkArticle[];
}

export type CategoryBookmarkArticleResponse = UnreadBookmarkArticleResponse;
