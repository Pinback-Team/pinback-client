import MacNotice from '../../../../../assets/onBoarding/story/macNotice.svg';
import dotori from '../../../../../assets/onBoarding/icons/dotori.svg';
const MacStep = () => {
  return (
    <div className="flex h-full flex-col items-center">
      <img src={dotori} className="mb-[1.2rem]" alt="dotori" />
      <p className="head2 text-font-black-1">
        도토리 찾으러 갈 시간을 정해볼까요?
      </p>
      <p className="body2-m text-font-gray-3 mb-[4.3rem] mt-[0.8rem] text-center">
        Mac 사용자는 추가 알림 설정을 진행해 주세요.
      </p>
      <img src={MacNotice} className="absolute -bottom-[104px]" alt="mac" />
    </div>
  );
};
export default MacStep;
