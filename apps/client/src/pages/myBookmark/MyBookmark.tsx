import { Badge, PopupContainer } from '@pinback/design-system/ui';
import { useState, useRef } from 'react';
import {
  useGetBookmarkArticles,
  useGetBookmarkUnreadArticles,
  useGetCategoryBookmarkArticles,
} from '@pages/myBookmark/apis/queries';
import { useSearchParams } from 'react-router-dom';
import { REMIND_MOCK_DATA } from '@pages/remind/constants';
import CardEditModal from '@shared/components/cardEditModal/CardEditModal';
import OptionsMenuPortal from '@shared/components/sidebar/OptionsMenuPortal';
import { useAnchoredMenu } from '@shared/hooks/useAnchoredMenu';
import { belowOf } from '@shared/utils/anchorPosition';
import NoArticles from '@pages/myBookmark/components/NoArticles/NoArticles';
import { Icon } from '@pinback/design-system/icons';
import { useQueryClient } from '@tanstack/react-query';
import {
  useGetArticleDetail,
  useDeleteRemindArticle,
  usePutArticleReadStatus,
} from '@shared/apis/queries';
import NoUnreadArticles from '@pages/myBookmark/components/noUnreadArticles/NoUnreadArticles';
import FetchCard from '@pages/myBookmark/components/fetchCard/FetchCard';
import { useInfiniteScroll } from '@shared/hooks/useInfiniteScroll';

const MyBookmark = () => {
  const [activeBadge, setActiveBadge] = useState<'all' | 'notRead'>('all');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const category = searchParams.get('category');
  const categoryId = searchParams.get('id');

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { mutate: updateToReadStatus } = usePutArticleReadStatus();
  const { mutate: deleteArticle } = useDeleteRemindArticle();

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

  const { mutate: getArticleDetail, data: articleDetail } =
    useGetArticleDetail();

  const {
    state: menu,
    open: openMenu,
    close: closeMenu,
    style,
    containerRef,
  } = useAnchoredMenu((anchor) => belowOf(anchor, 8));

  const articlesToDisplay = category
    ? (categoryArticlesData?.pages.flatMap((page) => page.articles) ?? [])
    : activeBadge === 'all'
      ? (articlesData?.pages.flatMap((page) => page.articles) ?? [])
      : (unreadArticlesData?.pages.flatMap((page) => page.articles) ?? []);

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

  const handleDeleteArticle = (id: number) => {
    deleteArticle(id, {
      onSuccess: () => {
        // TODO: 쿼리키 팩토리 패턴 적용
        queryClient.invalidateQueries({ queryKey: ['bookmarkReadArticles'] });
        queryClient.invalidateQueries({ queryKey: ['bookmarkUnreadArticles'] });
        queryClient.invalidateQueries({
          queryKey: ['categoryBookmarkArticles'],
        });
        queryClient.invalidateQueries({ queryKey: ['arcons'] });
        setIsDeleteOpen(false);
        setDeleteTargetId(null);
        closeMenu();
      },
      onError: (error) => {
        console.error('아티클 삭제 실패:', error);
      },
    });
  };

  const getBookmarkTitle = (id: number | null) =>
    id == null ? '' : (REMIND_MOCK_DATA.find((d) => d.id === id)?.title ?? '');

  const handleBadgeClick = (badgeType: 'all' | 'notRead') => {
    setActiveBadge(badgeType);
  };

  const EmptyStateComponent = () => {
    if (articlesToDisplay.length === 0) {
      const totalArticlesInAllView = articlesData?.pages[0]?.totalArticle;
      if (totalArticlesInAllView === 0) {
        return <NoArticles />;
      }
      return <NoUnreadArticles />;
    }
    return null;
  };

  const totalArticleCount =
    (category
      ? categoryArticlesData?.pages[0]?.totalArticle
      : articlesData?.pages[0]?.totalArticle) ?? 0;

  const totalUnreadArticleCount =
    (category
      ? categoryArticlesData?.pages[0]?.totalUnreadArticle
      : articlesData?.pages[0]?.totalUnreadArticle) ?? 0;

  return (
    <div className="flex h-screen flex-col py-[5.2rem] pl-[8rem] pr-[5rem]">
      <div className="flex items-center gap-[0.4rem]">
        <div className="flex items-center gap-[0.4rem]">
          <p className="head3">나의 북마크</p>
          {category && (
            <Icon
              name="ic_arrow_down_disable"
              width={24}
              height={24}
              rotate={270}
              color="black"
            />
          )}
        </div>
        <p className="head3 text-main500">{category || ''}</p>
      </div>

      <div className="mt-[3rem] flex gap-[2.4rem]">
        <Badge
          text="전체보기"
          countNum={totalArticleCount}
          onClick={() => handleBadgeClick('all')}
          isActive={activeBadge === 'all'}
        />
        <Badge
          text="안 읽음"
          countNum={totalUnreadArticleCount}
          onClick={() => handleBadgeClick('notRead')}
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
                    // TODO: 쿼리키 팩토리 패턴 적용
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
                  onError: (error) => {
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

      <OptionsMenuPortal
        open={menu.open}
        style={style ?? undefined}
        containerRef={containerRef}
        categoryId={menu.categoryId}
        getCategoryName={getBookmarkTitle}
        onEdit={(id) => {
          getArticleDetail(id);
          setIsEditOpen(true);
          closeMenu();
        }}
        onDelete={(articleId) => {
          setDeleteTargetId(articleId);
          setIsDeleteOpen(true);
          closeMenu();
        }}
        onClose={closeMenu}
      />

      {isDeleteOpen && (
        <div className="fixed inset-0" aria-modal="true" role="dialog">
          <div
            className="absolute inset-0"
            onClick={() => setIsDeleteOpen(false)}
          />
          <div className="absolute inset-0 z-[100] flex items-center justify-center p-4">
            <PopupContainer
              isOpen
              type="subtext"
              title="정말 삭제하시겠어요?"
              subtext="저장된 내용이 모두 사라지게 돼요."
              left="취소"
              right="삭제"
              onLeftClick={() => setIsDeleteOpen(false)}
              onRightClick={() => {
                if (deleteTargetId != null) {
                  handleDeleteArticle(deleteTargetId);
                } else {
                  setIsDeleteOpen(false);
                }
              }}
              onClose={() => setIsDeleteOpen(false)}
            />
          </div>
        </div>
      )}

      {isEditOpen && articleDetail && (
        <div className="fixed inset-0 z-[1000]" aria-modal="true" role="dialog">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsEditOpen(false)}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <CardEditModal
              key={articleDetail.id}
              onClose={() => setIsEditOpen(false)}
              prevData={articleDetail}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookmark;
