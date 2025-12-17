import {
  useGetBookmarkArticles,
  useGetBookmarkUnreadArticles,
  useGetCategoryBookmarkArticles,
} from '@pages/myBookmark/apis/queries';

import { useInfiniteScroll } from '@shared/hooks/useInfiniteScroll';
import FetchCard from '@pages/myBookmark/components/fetchCard/FetchCard';
import NoArticles from '@pages/myBookmark/components/NoArticles/NoArticles';
import NoUnreadArticles from '@pages/myBookmark/components/noUnreadArticles/NoUnreadArticles';
import { MutableRefObject } from 'react';
import { Badge } from '@pinback/design-system/ui';

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
  const {
    data: articlesData,
    fetchNextPage: fetchNextArticles,
    hasNextPage: hasNextArticles,
  } = useGetBookmarkArticles();

  const {
    data: unreadArticlesData,
    fetchNextPage: fetchNextUnreadArticles,
    hasNextPage: hasNextUnreadArticles,
  } = useGetBookmarkUnreadArticles();

  const {
    data: categoryArticlesData,
    fetchNextPage: fetchNextCategoryArticles,
    hasNextPage: hasNextCategoryArticles,
  } = useGetCategoryBookmarkArticles(
    categoryId,
    activeBadge === 'notRead' ? false : null
  );

  const categoryList =
    categoryId && categoryArticlesData?.pages
      ? categoryArticlesData.pages.flatMap((page) => page.articles)
      : [];

  const articlesToDisplay = category
    ? categoryList
    : activeBadge === 'all'
      ? (articlesData?.pages.flatMap((page) => page.articles) ?? [])
      : (unreadArticlesData?.pages.flatMap((page) => page.articles) ?? []);

  const totalArticle = category
    ? categoryArticlesData?.pages?.[0]?.totalArticle
    : articlesData?.pages?.[0]?.totalArticle;

  const totalUnread = category
    ? categoryArticlesData?.pages?.[0]?.totalUnreadArticle
    : articlesData?.pages?.[0]?.totalUnreadArticle;

  const hasNextPage = category
    ? hasNextCategoryArticles
    : activeBadge === 'all'
      ? hasNextArticles
      : hasNextUnreadArticles;

  const fetchNextPage = category
    ? fetchNextCategoryArticles
    : activeBadge === 'all'
      ? fetchNextArticles
      : fetchNextUnreadArticles;

  const observerRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    root: scrollContainerRef,
  });

  /** Empty 상태 컴포넌트 */
  const EmptyStateComponent = () => {
    if (articlesToDisplay.length === 0) {
      if (articlesData?.pages?.[0]?.totalArticle === 0) return <NoArticles />;
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
            <FetchCard
              key={article.articleId}
              article={article}
              onClick={() => {
                window.open(article.url, '_blank');
                updateToReadStatus(article.articleId, {
                  onSuccess: () => {
                    queryClient.invalidateQueries({
                      queryKey: ['bookmarkReadArticles'],
                    });
                    queryClient.invalidateQueries({
                      queryKey: ['bookmarkUnreadArticles'],
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
