import { useState } from 'react';
import { Badge, Card } from '@pinback/design-system/ui';
import CardEditModal from '@shared/components/cardEditModal/CardEditModal';
import OptionsMenuPortal from '@shared/components/sidebar/OptionsMenuPortal';
import { useAnchoredMenu } from '@shared/hooks/useAnchoredMenu';
import { belowOf } from '@shared/utils/anchorPosition';
import { REMIND_MOCK_DATA } from './constants';
import { useGetRemindArticles } from '@pages/remind/apis/queries';
import { formatLocalDateTime } from '@shared/utils/formatDateTime';
import NoReadArticles from '@pages/remind/components/noReadArticles/NoReadArticles';
import NoUnreadArticles from '@pages/remind/components/noUnreadArticles/NoUnreadArticles';
import { usePutArticleReadStatus } from '@shared/apis/queries';
import { useQueryClient } from '@tanstack/react-query';

const Remind = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeBadge, setActiveBadge] = useState<'read' | 'notRead'>('notRead');
  const formattedDate = formatLocalDateTime();

  const queryClient = useQueryClient();

  const { mutate: updateToReadStatus } = usePutArticleReadStatus();
  const { data } = useGetRemindArticles(
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

  const handleBadgeClick = (badgeType: 'read' | 'notRead') => {
    setActiveBadge(badgeType);
  };

  const EmptyStateComponent =
    activeBadge === 'read' ? <NoReadArticles /> : <NoUnreadArticles />;

  return (
    <div className="flex flex-col py-[5.2rem] pl-[8rem]">
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
        <div className="scrollbar-hide mt-[2.6rem] flex max-w-[104rem] flex-wrap gap-[1.6rem] overflow-y-auto scroll-smooth">
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
        EmptyStateComponent
      )}

      <OptionsMenuPortal
        open={menu.open}
        style={style ?? undefined}
        containerRef={containerRef}
        categoryId={menu.categoryId}
        getCategoryName={getItemTitle}
        onEdit={() => {
          setIsEditOpen(true);
          closeMenu();
        }}
        onDelete={(id) => {
          console.log('delete', id);
          closeMenu();
        }}
        onClose={closeMenu}
      />

      {isEditOpen && (
        <div className="fixed inset-0 z-[1000]" aria-modal="true" role="dialog">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            onClick={() => setIsEditOpen(false)}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <CardEditModal onClose={() => setIsEditOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Remind;
