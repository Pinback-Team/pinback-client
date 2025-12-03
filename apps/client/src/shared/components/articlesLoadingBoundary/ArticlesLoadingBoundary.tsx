import chippiError from '@assets/chippi_error.svg';

const ArticlesLoadingBoundary = () => {
  return (
    <div className="mt-[10rem] flex flex-col items-center justify-center text-center">
      {/* ToDo: 로딩 컴포넌트 변경 예정 */}
      <img
        src={chippiError}
        alt="Error"
        className="mt-[1rem] h-auto w-[18rem]"
      />

      <p className="body1-m text-font-gray-3 mb-[3rem]">
        치삐가 목록을 불러오고 있어요!
      </p>
    </div>
  );
};

export default ArticlesLoadingBoundary;
