import LoadingChippi from '@shared/components/loadingChippi/LoadingChippi';

const ArticlesLoadingBoundary = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center pt-[5rem] text-center">
      <div className="mb-[2rem]">
        <LoadingChippi />
      </div>

      <p className="head3 text-font-gray-1 mb-[1rem]">잠시만 기다려주세요...</p>

      <p className="body1-m text-font-gray-3">치삐가 목록을 불러오고 있어요!</p>
    </div>
  );
};

export default ArticlesLoadingBoundary;
