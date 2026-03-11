import chippiNoRemindArticles from '@assets/chippi_remindx.svg';

const NoUnreadArticles = () => {
  return (
    <div className="mx-auto mt-[14rem] flex flex-col items-center">
      <img src={chippiNoRemindArticles} alt="No Articles" />

      <p className="head2 mt-[1.6rem]">저장된 정보를 모두 꺼내봤어요!</p>
      <p className="body1-m text-font-gray-3 mt-[0.8rem]">
        치삐가 다음 도토리를 기다리고 있어요
      </p>
    </div>
  );
};

export default NoUnreadArticles;
