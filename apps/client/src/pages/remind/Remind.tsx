import { useMemo, useRef, useState, useEffect } from 'react';
import {
  Badge,
  PopupContainer,
  trackPageView,
} from '@pinback/design-system/ui';
import CardEditModal from '@shared/components/cardEditModal/CardEditModal';
import OptionsMenuPortal from '@shared/components/sidebar/OptionsMenuPortal';
import { useAnchoredMenu } from '@shared/hooks/useAnchoredMenu';
import { belowOf } from '@shared/utils/anchorPosition';
import { REMIND_MOCK_DATA } from './constants';
import { useGetRemindArticles } from '@pages/remind/apis/queries';
import { formatLocalDateTime } from '@shared/utils/formatDateTime';
import NoReadArticles from '@pages/remind/components/noReadArticles/NoReadArticles';
import NoUnreadArticles from '@pages/remind/components/noUnreadArticles/NoUnreadArticles';
import {
  usePutArticleReadStatus,
  useDeleteRemindArticle,
  useGetArticleDetail,
} from '@shared/apis/queries';
import { useQueryClient } from '@tanstack/react-query';
import NoRemindArticles from './components/noRemindArticles/NoRemindArticles';
import FetchCard from './components/fetchCard/FetchCard';
import { useInfiniteScroll } from '@shared/hooks/useInfiniteScroll';
import Tooltip from '@shared/components/tooltip/Tooltip';
import Footer from './components/footer/Footer';

const Remind = () => {
  useEffect(() => {
    trackPageView('대시보드 페이지 방문');
  }, []);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeBadge, setActiveBadge] = useState<'read' | 'notRead'>('notRead');
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const formattedDate = useMemo(() => {
    return formatLocalDateTime();
  }, []);

  const queryClient = useQueryClient();

  const { mutate: getArticleDetail, data: articleDetail } =
    useGetArticleDetail();
  const { mutate: updateToReadStatus } = usePutArticleReadStatus();
  const { mutate: deleteArticle } = useDeleteRemindArticle();
  const { data, isPending, fetchNextPage, hasNextPage } = useGetRemindArticles(
    formattedDate,
    activeBadge === 'read'
  );

  const observerRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    root: scrollContainerRef,
  });

  const {
    state: menu,
    open: openMenu,
    close: closeMenu,
    style,
    containerRef,
  } = useAnchoredMenu((anchor) => belowOf(anchor, 8));

  const articlesToDisplay =
    data?.pages
      .flatMap((page) => page.articles)
      .filter((article) => {
        const now = new Date().getTime();
        const remindTime = new Date(article.remindAt).getTime();
        // 만료 시간 = 리마인드 시간 + 24시간
        const expirationTime = remindTime + 24 * 60 * 60 * 1000;

        return now >= remindTime && now < expirationTime;
      }) ?? [];

  const getItemTitle = (id: number | null) =>
    id == null ? '' : (REMIND_MOCK_DATA.find((d) => d.id === id)?.title ?? '');

  const handleDeleteArticle = (id: number) => {
    deleteArticle(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['remindArticles'] });
        queryClient.invalidateQueries({ queryKey: ['arcons'] });
        setIsDeleteOpen(false);
        setDeleteTargetId(null);
        closeMenu();
        close();
      },
      onError: (error) => {
        console.error('아티클 삭제 실패:', error);
      },
    });
  };

  const handleBadgeClick = (badgeType: 'read' | 'notRead') => {
    setActiveBadge(badgeType);
  };

  const EmptyStateComponent = () => {
    const firstPageData = data?.pages[0];
    if (
      firstPageData?.readArticleCount === 0 &&
      firstPageData?.unreadArticleCount === 0
    ) {
      return <NoRemindArticles />;
    }

    return activeBadge === 'read' ? <NoReadArticles /> : <NoUnreadArticles />;
  };

  // TODO: 로딩 상태 디자인 필요
  if (isPending) {
    return <div>Loading...</div>;
  }

  // TODO: 임시
  // const unreadArticleCount = data?.pages[0]?.unreadArticleCount || 0;
  // const readArticleCount = data?.pages[0]?.readArticleCount || 0;

  return (
    <div className="flex h-screen flex-col pl-[8rem] pr-[5rem] pt-[5.2rem]">
      <p className="head3">리마인드</p>
      <div className="mt-[3rem] flex gap-[2.4rem]">
        <Badge
          text="안 읽음"
          // countNum={unreadArticleCount}
          onClick={() => handleBadgeClick('notRead')}
          isActive={activeBadge === 'notRead'}
        />
        <Badge
          text="읽음"
          // countNum={readArticleCount}
          onClick={() => handleBadgeClick('read')}
          isActive={activeBadge === 'read'}
        />
      </div>
      <Tooltip />

      {articlesToDisplay.length > 0 ? (
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide mt-[2.6rem] flex flex-wrap gap-[1.6rem] overflow-y-auto scroll-smooth"
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
                      queryKey: ['remindArticles'],
                    });
                    queryClient.invalidateQueries({
                      queryKey: ['arcons'],
                    });
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

      <Footer />

      <OptionsMenuPortal
        open={menu.open}
        style={style ?? undefined}
        containerRef={containerRef}
        categoryId={menu.categoryId}
        getCategoryName={getItemTitle}
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
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
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

export default Remind;
