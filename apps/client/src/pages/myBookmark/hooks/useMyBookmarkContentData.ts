import {
  useGetBookmarkArticles,
  useGetBookmarkArticlesCount,
  useGetCategoryBookmarkArticles,
  useGetCategoryBookmarkArticlesCount,
} from '@pages/myBookmark/apis/queries';
import { useInfiniteScroll } from '@shared/hooks/useInfiniteScroll';
import { MutableRefObject } from 'react';

interface UseMyBookmarkContentDataParams {
  activeBadge: 'all' | 'notRead';
  category: string | null;
  categoryId: string | null;
  scrollContainerRef: MutableRefObject<HTMLDivElement | null>;
}

export const useMyBookmarkContentData = ({
  activeBadge,
  category,
  categoryId,
  scrollContainerRef,
}: UseMyBookmarkContentDataParams) => {
  const readStatus = activeBadge === 'notRead' ? false : null;
  const isCategoryView = !!categoryId;

  const {
    data: bookmarkArticlesData,
    fetchNextPage: fetchNextBookmarkArticles,
    hasNextPage: hasNextBookmarkArticles,
    isFetchingNextPage: isFetchingNextBookmarkArticles,
  } = useGetBookmarkArticles(readStatus);

  const { data: bookmarkCountData } = useGetBookmarkArticlesCount();
  const { data: categoryCountData } =
    useGetCategoryBookmarkArticlesCount(categoryId);

  const {
    data: categoryArticlesData,
    fetchNextPage: fetchNextCategoryArticles,
    hasNextPage: hasNextCategoryArticles,
    isFetchingNextPage: isFetchingNextCategoryArticles,
  } = useGetCategoryBookmarkArticles(categoryId, readStatus);

  const categoryList =
    isCategoryView && categoryArticlesData?.pages
      ? categoryArticlesData.pages.flatMap((page) => page.articles)
      : [];

  const articlesToDisplay = isCategoryView
    ? categoryList
    : (bookmarkArticlesData?.pages.flatMap((page) => page.articles) ?? []);

  const totalArticle = isCategoryView
    ? categoryCountData?.totalArticleCount
    : bookmarkCountData?.totalArticleCount;
  const totalUnread = isCategoryView
    ? categoryCountData?.unreadArticleCount
    : bookmarkCountData?.unreadArticleCount;

  const categoryNameFromResponse = isCategoryView
    ? categoryArticlesData?.pages?.[0]?.categoryName || category || undefined
    : undefined;

  const hasNextPage = isCategoryView
    ? hasNextCategoryArticles
    : hasNextBookmarkArticles;

  const fetchNextPage = isCategoryView
    ? fetchNextCategoryArticles
    : fetchNextBookmarkArticles;

  const isFetchingNextPage = isCategoryView
    ? isFetchingNextCategoryArticles
    : isFetchingNextBookmarkArticles;

  const sentinelRef = useInfiniteScroll({
    loadMore: fetchNextPage,
    hasMore: hasNextPage,
    isLoadingMore: isFetchingNextPage,
    rootRef: scrollContainerRef,
  });

  return {
    view: {
      isCategoryView,
      categoryName: categoryNameFromResponse,
    },
    list: {
      articles: articlesToDisplay,
    },
    counts: {
      total: totalArticle,
      unread: totalUnread,
    },
    pagination: {
      sentinelRef,
    },
  };
};
