import { useState } from 'react';
import { Badge, Card, PopupContainer } from '@pinback/design-system/ui';
import CardEditModal from '@shared/components/cardEditModal/CardEditModal';
import OptionsMenuPortal from '@shared/components/sidebar/OptionsMenuPortal';
import { useAnchoredMenu } from '@shared/hooks/useAnchoredMenu';
import { belowOf } from '@shared/utils/anchorPosition';
import { REMIND_MOCK_DATA } from './constants';
import { useGetRemindArticles } from './apis/queries';
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

const Remind = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeBadge, setActiveBadge] = useState<'read' | 'notRead'>('notRead');
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const formattedDate = formatLocalDateTime();

  const queryClient = useQueryClient();

  const { mutate: updateToReadStatus } = usePutArticleReadStatus();
  const { mutate: deleteArticle } = useDeleteRemindArticle();
  const { data, isPending } = useGetRemindArticles(
    formattedDate,
    activeBadge === 'read',
    1,
    10
  );

  const {
    state: menu,
    open: openMenu,
    close: closeMenu,
    style,
    containerRef,
  } = useAnchoredMenu((anchor) => belowOf(anchor, 8));

  const getItemTitle = (id: number | null) =>
    id == null ? '' : (REMIND_MOCK_DATA.find((d) => d.id === id)?.title ?? '');
  const { mutate: getArticleDetail, data: articleDetail } =
    useGetArticleDetail();

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
    if (data?.readArticleCount === 0 && data?.unreadArticleCount === 0) {
      return <NoRemindArticles />;
    }

    return activeBadge === 'read' ? <NoReadArticles /> : <NoUnreadArticles />;
  };

  // TODO: 로딩 상태 디자인 필요
  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col py-[5.2rem] pl-[8rem] pr-[5rem]">
      <p className="head3">리마인드</p>
      <div className="mt-[3rem] flex gap-[2.4rem]">
        <Badge
          text="안 읽음"
          countNum={data?.unreadArticleCount || 0}
          onClick={() => handleBadgeClick('notRead')}
          isActive={activeBadge === 'notRead'}
        />
        <Badge
          text="읽음"
          countNum={data?.readArticleCount || 0}
          onClick={() => handleBadgeClick('read')}
          isActive={activeBadge === 'read'}
        />
      </div>

      {data?.articles && data.articles.length > 0 ? (
        <div className="scrollbar-hide mt-[2.6rem] flex flex-wrap gap-[1.6rem] overflow-y-auto scroll-smooth">
          {data.articles.map((article) => (
            <Card
              key={article.articleId}
              type="remind"
              title={article.url}
              content={article.memo}
              timeRemaining={article.remindAt}
              category={article.category.categoryName}
              {...(activeBadge === 'notRead' && {
                onOptionsClick: (e) =>
                  openMenu(article.category.categoryId, e.currentTarget),
              })}
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
            />
          ))}
        </div>
      ) : (
        <EmptyStateComponent />
      )}

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

      {isEditOpen && (
        <div className="fixed inset-0 z-[1000]" aria-modal="true" role="dialog">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            onClick={() => setIsEditOpen(false)}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <CardEditModal
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
