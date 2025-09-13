interface BookmarkArticle {
  articleId: number;
  url: string;
  memo: string;
  createdAt: string;
  isRead: boolean;
}

// 북마크 전체 조회
export interface BookmarkArticleResponse {
  totalArticle: number;
  totalUnreadArticle: number;
  articles: BookmarkArticle[];
}

// 북마크 안 읽음 조회
export interface UnreadBookmarkArticleResponse {
  totalUnreadArticle: number;
  articles: BookmarkArticle[];
}
