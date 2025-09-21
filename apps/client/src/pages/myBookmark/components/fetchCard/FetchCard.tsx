import { BookmarkArticle } from '@pages/myBookmark/types/api';
import { Card } from '@pinback/design-system/ui';
import { useGetPageMeta } from '@shared/apis/queries';
import React from 'react';

interface FetchCardProps {
  article: BookmarkArticle;
  onClick: () => void;
  onOptionsClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const FetchCard = ({ article, onClick, onOptionsClick }: FetchCardProps) => {
  const { data: meta, isPending, isError: error } = useGetPageMeta(article.url);

  if (isPending) {
    return (
      <div className="bg-gray200 h-[35.6rem] w-[24.8rem] animate-pulse rounded-[1.2rem]" />
    );
  }

  const displayTitle = !error && meta.title ? meta.title : '제목 없음';
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
