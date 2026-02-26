import { PopupContainer } from '@pinback/design-system/ui';
import { useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { REMIND_MOCK_DATA } from '@pages/remind/constants';
import CardEditModal from '@shared/components/cardEditModal/CardEditModal';
import OptionsMenuPortal from '@shared/components/sidebar/OptionsMenuPortal';
import { useAnchoredMenu } from '@shared/hooks/useAnchoredMenu';
import { belowOf } from '@shared/utils/anchorPosition';
import { Icon } from '@pinback/design-system/icons';
import { useQueryClient } from '@tanstack/react-query';
import {
  useGetArticleDetail,
  useDeleteRemindArticle,
  usePutArticleReadStatus,
} from '@shared/apis/queries';
import TooltipCard from '@shared/components/tooltipCard/TooltipCard';
import ArticlesLoadingBoundary from '@shared/components/articlesLoadingBoundary/ArticlesLoadingBoundary';
import ArticlesErrorBoundary from '@shared/components/articlesErrorBoundary/ArticlesErrorBoundary';
import { ErrorBoundary } from 'react-error-boundary';
import MyBookmarkContent from '@pages/myBookmark/components/myBookmarkContent/MyBookmarkContent';
import Footer from './components/footer/Footer';

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
  const { mutate: getArticleDetail, data: articleDetail } =
    useGetArticleDetail();

  const {
    state: menu,
    open: openMenu,
    close: closeMenu,
    style,
    containerRef,
  } = useAnchoredMenu((anchor) => belowOf(anchor, 8));

  const handleDeleteArticle = (id: number) => {
    deleteArticle(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['bookmarkArticles'] });
        queryClient.invalidateQueries({ queryKey: ['bookmarkArticlesCount'] });
        queryClient.invalidateQueries({
          queryKey: ['categoryBookmarkArticlesCount'],
        });
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

  return (
    <div className="flex h-screen flex-col pl-[8rem] pr-[5rem] pt-[5.2rem]">
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

      <TooltipCard />

      <Suspense fallback={<ArticlesLoadingBoundary />}>
        <ErrorBoundary FallbackComponent={ArticlesErrorBoundary}>
          <MyBookmarkContent
            category={category}
            categoryId={categoryId}
            activeBadge={activeBadge}
            onBadgeChange={setActiveBadge}
            updateToReadStatus={updateToReadStatus}
            openMenu={openMenu}
            queryClient={queryClient}
            scrollContainerRef={scrollContainerRef}
          />
        </ErrorBoundary>
      </Suspense>
      <Footer />

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
