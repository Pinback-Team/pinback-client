import { Badge, Card } from '@pinback/design-system/ui';
import { useState } from 'react';
import {
  useGetBookmarkArticles,
  useGetBookmarkUnreadArticles,
} from './apis/queries';
import { REMIND_MOCK_DATA } from '@pages/remind/constants';
import CardEditModal from '@shared/components/cardEditModal/CardEditModal';
import OptionsMenuPortal from '@shared/components/sidebar/OptionsMenuPortal';
import { useAnchoredMenu } from '@shared/hooks/useAnchoredMenu';
import { belowOf } from '@shared/utils/anchorPosition';
import NoArticles from '@pages/myBookmark/components/NoArticles/NoArticles';

const MyBookmark = () => {
  const [activeBadge, setActiveBadge] = useState<'all' | 'notRead'>('all');
  const [isEditOpen, setIsEditOpen] = useState(false);

  const {
    state: menu,
    open: openMenu,
    close: closeMenu,
    style,
    containerRef,
  } = useAnchoredMenu((anchor) => belowOf(anchor, 8));

  const getBookmarkTitle = (id: number | null) =>
    id == null ? '' : (REMIND_MOCK_DATA.find((d) => d.id === id)?.title ?? '');

  const { data: articles } = useGetBookmarkArticles(1, 10);
  const { data: unreadArticles } = useGetBookmarkUnreadArticles(1, 10);

  const handleBadgeClick = (badgeType: 'all' | 'notRead') => {
    setActiveBadge(badgeType);
  };

  return (
    <div className="flex flex-col py-[5.2rem] pl-[8rem]">
      <p className="head3">나의 북마크</p>

      <div className="mt-[3rem] flex gap-[2.4rem]">
        <Badge
          text="전체보기"
          countNum={articles?.totalArticle || 0}
          onClick={() => handleBadgeClick('all')}
          isActive={activeBadge === 'all'}
        />
        <Badge
          text="안 읽음"
          countNum={articles?.totalUnreadArticle || 0}
          onClick={() => handleBadgeClick('notRead')}
          isActive={activeBadge === 'notRead'}
        />
      </div>

      <div className="scrollbar-hide mt-[2.6rem] flex h-screen max-w-[104rem] flex-wrap gap-[1.6rem] overflow-y-auto scroll-smooth">
        {activeBadge === 'all' &&
          (articles?.articles && articles.articles.length > 0 ? (
            articles.articles.map((article) => (
              <Card
                key={article.articleId}
                type="bookmark"
                title={article.url}
                content={article.memo}
                category={article.category.categoryName}
                date={new Date(article.createdAt).toLocaleDateString('ko-KR')}
                onClick={() => {}}
                onOptionsClick={(e) =>
                  openMenu(article.articleId, e.currentTarget)
                }
              />
            ))
          ) : (
            <NoArticles />
          ))}

        {activeBadge === 'notRead' &&
          (unreadArticles?.articles && unreadArticles.articles.length > 0 ? (
            unreadArticles.articles.map((article) => (
              <Card
                key={article.articleId}
                type="bookmark"
                title={article.url}
                content={article.memo}
                category={article.category.categoryName}
                date={new Date(article.createdAt).toLocaleDateString('ko-KR')}
                onClick={() => {}}
                onOptionsClick={(e) =>
                  openMenu(article.articleId, e.currentTarget)
                }
              />
            ))
          ) : (
            <NoArticles />
          ))}
        <OptionsMenuPortal
          open={menu.open}
          style={style ?? undefined}
          containerRef={containerRef}
          categoryId={menu.categoryId}
          getCategoryName={getBookmarkTitle}
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
      </div>

      {isEditOpen && (
        <div className="fixed inset-0 z-[1000]" aria-modal="true" role="dialog">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            onClick={() => setIsEditOpen(false)}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            {/* 필요하면 menu.categoryId를 모달에 전달 */}
            <CardEditModal onClose={() => setIsEditOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookmark;
