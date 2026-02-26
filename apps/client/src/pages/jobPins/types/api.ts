interface JobPinCategory {
  categoryId: number;
  categoryName: string;
  categoryColor: string;
}

interface JobPinArticle {
  articleId: number;
  url: string;
  title: string;
  thumbnailUrl: string;
  memo: string;
  ownerName: string;
  category: JobPinCategory;
}

export interface JobPinsResponse {
  job: string | null;
  articles: JobPinArticle[];
}
