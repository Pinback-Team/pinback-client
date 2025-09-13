import { Badge, Card } from '@pinback/design-system/ui';
import { useState } from 'react';
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
import { useDeleteRemindArticle } from '@pages/remind/apis/queries';
import { useQueryClient } from '@tanstack/react-query';
import { usePutArticleReadStatus } from '@shared/apis/queries';

const MyBookmark = () => {
  const [activeBadge, setActiveBadge] = useState<'all' | 'notRead'>('all');
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const category = searchParams.get('category');
  const categoryId = searchParams.get('id');

  const { data: articles } = useGetBookmarkArticles(0, 20);
  const { data: unreadArticles } = useGetBookmarkUnreadArticles(0, 20);
  const { data: categoryArticles } = useGetCategoryBookmarkArticles(
    categoryId,
    1,
    10
  );
  const { mutate: updateToReadStatus } = usePutArticleReadStatus();
  const { mutate: deleteArticle } = useDeleteRemindArticle();

  const handleDeleteArticle = (id: number) => {
    deleteArticle(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['remindArticles'] });
        close();
      },
      onError: (error) => {
        console.error('아티클 삭제 실패:', error);
      },
    });
  };

  const {
    state: menu,
    open: openMenu,
    close: closeMenu,
    style,
    containerRef,
  } = useAnchoredMenu((anchor) => belowOf(anchor, 8));

  const getBookmarkTitle = (id: number | null) =>
    id == null ? '' : (REMIND_MOCK_DATA.find((d) => d.id === id)?.title ?? '');

  const articlesToDisplay =
    activeBadge === 'all' ? articles?.articles : unreadArticles?.articles;

  // 임시 콘솔
  console.log('categoryArticles', categoryArticles);

  const handleBadgeClick = (badgeType: 'all' | 'notRead') => {
    setActiveBadge(badgeType);
  };

  return (
    <div className="flex h-screen flex-col py-[5.2rem] pl-[8rem]">
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

      {articlesToDisplay && articlesToDisplay.length > 0 ? (
        <div className="scrollbar-hide mt-[2.6rem] flex h-screen max-w-[104rem] flex-wrap gap-[1.6rem] overflow-y-auto scroll-smooth">
          {articlesToDisplay.map((article) => (
            <Card
              key={article.articleId}
              type="bookmark"
              title={article.url}
              content={article.memo}
              category={article.category.categoryName}
              date={new Date(article.createdAt).toLocaleDateString('ko-KR')}
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
                  },
                  onError: (error) => {
                    console.error(error);
                  },
                });
              }}
              onOptionsClick={(e) =>
                openMenu(article.articleId, e.currentTarget)
              }
            />
          ))}
        </div>
      ) : (
        <NoArticles />
      )}

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
        onDelete={(articleId) => {
          handleDeleteArticle(articleId);
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

export default MyBookmark;
