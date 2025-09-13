import chippiNoArticles from '@assets/chippi_x.svg';
import { Icon } from '@pinback/design-system/icons';

const NoArticles = () => {
  return (
    <div className="mx-auto mt-[14rem] flex flex-col items-center">
      <img src={chippiNoArticles} alt="No Articles" />

      <p className="head2 mt-[1.6rem]">첫 북마크가 저장되면 여기에 모여요 ✨</p>
      <div className="mt-[0.8rem] flex items-center">
        <p className="body1-m text-font-gray-3 gap-[0.4rem]">
          원하는 페이지에서
        </p>
        <div className="flex items-center text-center">
          <Icon name="ic_extension" width={28} height={28} />
          <p className="body1-m text-font-gray-3">아이콘을 눌러주세요.</p>
        </div>
      </div>
    </div>
  );
};

export default NoArticles;
