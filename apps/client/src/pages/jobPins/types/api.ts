export interface JobPinArticle {
  url: string;
  title: string;
  thumbnailUrl: string;
  categoryName: string;
  categoryColor: string;
}

export interface JobPinsResponse {
  job: string | null;
  articles: JobPinArticle[];
}
