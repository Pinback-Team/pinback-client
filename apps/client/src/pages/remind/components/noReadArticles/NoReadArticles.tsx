import chippiNoArticles from '@assets/chippi_x.svg';

const NoReadArticles = () => {
  return (
    <div className="mx-auto mt-[14rem] flex flex-col items-center">
      <img src={chippiNoArticles} alt="No Articles" />

      <p className="head2 mt-[1.6rem]">앗..</p>
      <p className="body1-m text-font-gray-3 mt-[0.8rem]">
        리마인드에서 안 읽은 북마크를 확인해 보세요.
      </p>
    </div>
  );
};

export default NoReadArticles;
