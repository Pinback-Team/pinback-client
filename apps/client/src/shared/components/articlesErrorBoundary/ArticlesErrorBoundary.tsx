import chippiError from '@assets/chippi_error.svg';

const ArticlesErrorBoundary = () => {
  return (
    <div className="mt-[10rem] flex flex-col items-center justify-center text-center">
      <h1 className="text-main500 head1 mb-[1rem]">404 ERROR</h1>

      <p className="body1-m text-font-gray-3 mb-[3rem]">
        죄송합니다. 페이지를 찾을 수 없습니다.
      </p>

      <img
        src={chippiError}
        alt="Error"
        className="mt-[1rem] h-auto w-[18rem]"
      />
    </div>
  );
};

export default ArticlesErrorBoundary;
