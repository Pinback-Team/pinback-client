import {
  useGetJobPinsArticleDetail,
  useGetJobPinsArticles,
} from '@pages/jobPins/apis/queries';
import MemoPopup from '@pages/jobPins/components/MemoPopup';
import Footer from '@pages/myBookmark/components/footer/Footer';
import { Card } from '@pinback/design-system/ui';
import { useInfiniteScroll } from '@shared/hooks/useInfiniteScroll';
import { useRef } from 'react';

const JobPins = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { data, isPending, fetchNextPage, hasNextPage } =
    useGetJobPinsArticles();
  const {
    mutate: getJobPinDetail,
    data: jobPinDetail,
    reset: resetJobPinDetail,
  } = useGetJobPinsArticleDetail();

  const observerRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    root: scrollContainerRef,
  });

  const articlesToDisplay =
    data?.pages.flatMap((page) => page.articles ?? []) ?? [];

  const job = data?.pages?.[0]?.job ?? null;

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen flex-col pl-[8rem] pr-[5rem] pt-[5.2rem]">
      <div className="flex items-center gap-[1.2rem]">
        <p className="head3">관심 직무 핀</p>
        {job && <p className="head3 text-main500">{job}</p>}
      </div>

      <p className="body3-r text-font-gray-3 mt-[0.8rem]">
        같은 직무의 사람들이 저장한 아티클을 살펴봐요. 선택한 직무를 기준으로
        최신 핀이 업데이트 돼요!
      </p>

      {job === null ? (
        <p className="body2-m text-font-gray-3 mt-[4rem]">
          기존 사용자 직무 선택 API로 직무 정보를 변경해주세요.
        </p>
      ) : articlesToDisplay.length > 0 ? (
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide mt-[2.6rem] flex h-screen flex-wrap content-start gap-[1.6rem] overflow-y-auto scroll-smooth"
        >
          {articlesToDisplay.map((article) => {
            const displayTitle = article.title?.trim()
              ? article.title
              : '제목 없음';

            const displayImageUrl = article.thumbnailUrl || undefined;

            return (
              <Card
                key={article.articleId}
                type="bookmark"
                variant="save"
                title={displayTitle}
                imageUrl={displayImageUrl}
                content={article.memo}
                category={article.category?.categoryName}
                categoryColor={article.category?.categoryColor}
                nickname={article.ownerName}
                onClick={() => getJobPinDetail(article.articleId)}
              />
            );
          })}

          <div
            ref={observerRef}
            style={{
              height: '1px',
              width: '100%',
            }}
          />
        </div>
      ) : (
        <p className="body2-m text-font-gray-3 mt-[4rem]">
          아직 공유된 아티클이 없어요.
        </p>
      )}

      <Footer />

      {/* Memo Popup */}
      {jobPinDetail && (
        <MemoPopup
          userName={jobPinDetail.ownerName}
          memo={jobPinDetail.memo}
          onClose={resetJobPinDetail}
          onGoArticle={() => window.open(jobPinDetail.url, '_blank')}
        />
      )}
    </div>
  );
};

export default JobPins;
