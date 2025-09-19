import { Card } from '@pinback/design-system/ui';
import { useGetPageMeta } from '@shared/apis/queries';
import React from 'react';

interface Category {
  categoryId: number;
  categoryName: string;
  categoryColor: string;
}

interface BookmarkArticle {
  articleId: number;
  url: string;
  memo: string;
  createdAt: string;
  isRead: boolean;
  category: Category;
}

export interface BookmarkArticleResponse {
  totalArticle: number;
  totalUnreadArticle: number;
  isNewUser: boolean;
  articles: BookmarkArticle[];
}

interface FetchCardProps {
  article: BookmarkArticle;
  onClick: () => void;
  onOptionsClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const FetchCard = ({ article, onClick, onOptionsClick }: FetchCardProps) => {
  const { data: meta, isPending, isError: error } = useGetPageMeta(article.url);

  if (isPending) {
    return (
      <div className="h-[33.8rem] w-[28rem] animate-pulse rounded-[1.2rem] bg-gray-200" />
    );
  }

  const displayTitle = !error && meta.title ? meta.title : '';
  const displayImageUrl = !error ? meta.image : undefined;

  return (
    <Card
      type="bookmark"
      title={displayTitle}
      imageUrl={displayImageUrl}
      content={article.memo}
      category={article.category.categoryName}
      date={new Date(article.createdAt).toLocaleDateString('ko-KR')}
      onClick={onClick}
      onOptionsClick={onOptionsClick}
    />
  );
};

export default FetchCard;
