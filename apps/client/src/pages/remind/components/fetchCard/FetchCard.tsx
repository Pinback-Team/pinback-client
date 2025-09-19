import { ArticleWithCategory } from '@pages/remind/types/api';
import { Card } from '@pinback/design-system/ui';
import { useGetPageMeta } from '@shared/apis/queries';
import React from 'react';

interface FetchCardProps {
  article: ArticleWithCategory;
  onClick: () => void;
  onOptionsClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const FetchCard = ({ article, onClick, onOptionsClick }: FetchCardProps) => {
  const { data: meta, isPending, isError: error } = useGetPageMeta(article.url);

  if (isPending) {
    return (
      <div className="bg-gray200 h-[35.6rem] w-[24.8rem] rounded-[1.2rem]"></div>
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
