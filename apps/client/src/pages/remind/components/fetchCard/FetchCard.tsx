import { Card } from '@pinback/design-system/ui';
import { useGetPageMeta } from '@shared/apis/queries';
import React from 'react';

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

interface FetchCardProps {
  article: ArticleWithCategory;
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
      type="remind"
      title={displayTitle}
      imageUrl={displayImageUrl}
      content={article.memo}
      timeRemaining={article.remindAt}
      category={article.category.categoryName}
      onClick={onClick}
      onOptionsClick={onOptionsClick}
    />
  );
};

export default FetchCard;
