import NoArticles from '@pages/myBookmark/components/NoArticles/NoArticles';
import NoUnreadArticles from '@pages/myBookmark/components/noUnreadArticles/NoUnreadArticles';
import { useMyBookmarkContentData } from '@pages/myBookmark/hooks/useMyBookmarkContentData';
import { Badge, Card } from '@pinback/design-system/ui';
import { MutableRefObject } from 'react';

interface MyBookmarkContentProps {
  activeBadge: 'all' | 'notRead';
  onBadgeChange: (type: 'all' | 'notRead') => void;
  category: string | null;
  categoryId: string | null;
  updateToReadStatus: (id: number, options?: any) => void;
  openMenu: (id: number, anchor: HTMLElement) => void;
  queryClient: any;
  scrollContainerRef: MutableRefObject<HTMLDivElement | null>;
}

const MyBookmarkContent = ({
  activeBadge,
  onBadgeChange,
  category,
  categoryId,
  updateToReadStatus,
  openMenu,
  queryClient,
  scrollContainerRef,
}: MyBookmarkContentProps) => {
  const { view, list, counts, pagination } = useMyBookmarkContentData({
    activeBadge,
    category,
    categoryId,
    scrollContainerRef,
  });
  const totalCount = counts.total ?? 0;

  /** Empty 상태 컴포넌트 */
  const EmptyStateComponent = () => {
    if (list.articles.length === 0) {
      if (totalCount === 0) return <NoArticles />;
      return <NoUnreadArticles />;
    }
    return null;
  };

  return (
    <>
      <div className="mt-[3rem] flex gap-[2.4rem]">
        <Badge
          text="전체보기"
          countNum={counts.total ?? 0}
          onClick={() => onBadgeChange('all')}
          isActive={activeBadge === 'all'}
        />
        <Badge
          text="안 읽음"
          countNum={counts.unread ?? 0}
          onClick={() => onBadgeChange('notRead')}
          isActive={activeBadge === 'notRead'}
        />
      </div>

      {list.articles.length > 0 ? (
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide mt-[2.6rem] flex h-screen flex-wrap content-start gap-[1.6rem] overflow-y-auto scroll-smooth"
        >
          {list.articles.map((article) => (
            <Card
              key={article.articleId}
              type="bookmark"
              title={article.title || '제목 없음'}
              imageUrl={article.thumbnailUrl || undefined}
              content={article.memo ?? undefined}
              category={
                view.isCategoryView
                  ? view.categoryName
                  : article.category?.categoryName
              }
              categoryColor={
                view.isCategoryView
                  ? undefined
                  : article.category?.categoryColor
              }
              date={new Date(article.createdAt).toLocaleDateString('ko-KR')}
              onClick={() => {
                window.open(article.url, '_blank');
                updateToReadStatus(article.articleId, {
                  onSuccess: () => {
                    queryClient.invalidateQueries({
                      queryKey: ['bookmarkArticles'],
                    });
                    queryClient.invalidateQueries({
                      queryKey: ['bookmarkArticlesCount'],
                    });
                    queryClient.invalidateQueries({
                      queryKey: ['categoryBookmarkArticlesCount'],
                    });
                    queryClient.invalidateQueries({
                      queryKey: ['categoryBookmarkArticles'],
                    });
                    queryClient.invalidateQueries({ queryKey: ['acorns'] });
                  },
                  onError: (error: any) => {
                    console.error(error);
                  },
                });
              }}
              onOptionsClick={(e) => {
                e.stopPropagation();
                openMenu(article.articleId, e.currentTarget);
              }}
            />
          ))}

          <div
            ref={pagination.sentinelRef}
            style={{ height: '1px', width: '100%' }}
          />
        </div>
      ) : (
        <EmptyStateComponent />
      )}
    </>
  );
};

export default MyBookmarkContent;
