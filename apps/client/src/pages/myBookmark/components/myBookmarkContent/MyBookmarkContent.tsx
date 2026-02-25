import {
  useGetBookmarkArticles,
  useGetBookmarkArticlesCount,
  useGetCategoryBookmarkArticlesCount,
  useGetCategoryBookmarkArticles,
} from '@pages/myBookmark/apis/queries';

import { useInfiniteScroll } from '@shared/hooks/useInfiniteScroll';
import NoArticles from '@pages/myBookmark/components/NoArticles/NoArticles';
import NoUnreadArticles from '@pages/myBookmark/components/noUnreadArticles/NoUnreadArticles';
import { MutableRefObject } from 'react';
import { Badge, Card } from '@pinback/design-system/ui';

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
  const readStatus = activeBadge === 'notRead' ? false : null;

  const {
    data: bookmarkArticlesData,
    fetchNextPage: fetchNextBookmarkArticles,
    hasNextPage: hasNextBookmarkArticles,
  } = useGetBookmarkArticles(readStatus);
  const { data: bookmarkCountData } = useGetBookmarkArticlesCount();
  const { data: categoryCountData } = useGetCategoryBookmarkArticlesCount(
    categoryId
  );

  const {
    data: categoryArticlesData,
    fetchNextPage: fetchNextCategoryArticles,
    hasNextPage: hasNextCategoryArticles,
  } = useGetCategoryBookmarkArticles(
    categoryId,
    readStatus
  );

  const categoryList =
    categoryId && categoryArticlesData?.pages
      ? categoryArticlesData.pages.flatMap((page) => page.articles)
      : [];

  const articlesToDisplay = category
    ? categoryList
    : (bookmarkArticlesData?.pages.flatMap((page) => page.articles) ?? []);

  const totalArticle = categoryId
    ? categoryCountData?.totalArticleCount
    : bookmarkCountData?.totalArticleCount;
  const totalUnread = categoryId
    ? categoryCountData?.unreadArticleCount
    : bookmarkCountData?.unreadArticleCount;

  const hasNextPage = category
    ? hasNextCategoryArticles
    : hasNextBookmarkArticles;

  const fetchNextPage = category
    ? fetchNextCategoryArticles
    : fetchNextBookmarkArticles;

  const observerRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    root: scrollContainerRef,
  });

  /** Empty 상태 컴포넌트 */
  const EmptyStateComponent = () => {
    if (articlesToDisplay.length === 0) {
      const totalCount = categoryId
        ? categoryCountData?.totalArticleCount
        : bookmarkCountData?.totalArticleCount;
      if ((totalCount ?? 0) === 0) return <NoArticles />;
      return <NoUnreadArticles />;
    }
    return null;
  };

  return (
    <>
      <div className="mt-[3rem] flex gap-[2.4rem]">
        <Badge
          text="전체보기"
          countNum={totalArticle ?? 0}
          onClick={() => onBadgeChange('all')}
          isActive={activeBadge === 'all'}
        />
        <Badge
          text="안 읽음"
          countNum={totalUnread ?? 0}
          onClick={() => onBadgeChange('notRead')}
          isActive={activeBadge === 'notRead'}
        />
      </div>

      {articlesToDisplay.length > 0 ? (
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide mt-[2.6rem] flex h-screen flex-wrap content-start gap-[1.6rem] overflow-y-auto scroll-smooth"
        >
          {articlesToDisplay.map((article) => (
            <Card
              key={article.articleId}
              type="bookmark"
              title={article.title || '제목 없음'}
              imageUrl={article.thumbnailUrl || undefined}
              content={article.memo ?? undefined}
              category={article.category.categoryName}
              categoryColor={article.category.categoryColor}
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
                    queryClient.invalidateQueries({ queryKey: ['arcons'] });
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

          <div ref={observerRef} style={{ height: '1px', width: '100%' }} />
        </div>
      ) : (
        <EmptyStateComponent />
      )}
    </>
  );
};

export default MyBookmarkContent;
