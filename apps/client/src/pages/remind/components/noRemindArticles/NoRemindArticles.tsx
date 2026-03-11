import chippiNoArticles from '@assets/chippi_x.svg';

const NoRemindArticles = () => {
  return (
    <div className="mx-auto mt-[14rem] flex flex-col items-center">
      <img src={chippiNoArticles} alt="No Articles" />

      <p className="head2 mt-[1.6rem]">앗..</p>
      <p className="body1-m text-font-gray-3 mt-[0.8rem]">
        저장된 정보가 없어요
      </p>
    </div>
  );
};

export default NoRemindArticles;
