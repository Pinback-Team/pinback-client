import dotori from '../../../../assets/onBoarding/icons/dotori.svg';
const FinalStep = () => {
  return (
    <div className="flex h-full flex-col items-center">
      <img src={dotori} className="mb-[1.2rem]" alt="dotori" />
      <p className="head2 text-font-black-1">
        도토리 찾으러 갈 시간을 정해볼까요?
      </p>
    </div>
  );
};
export default FinalStep;
