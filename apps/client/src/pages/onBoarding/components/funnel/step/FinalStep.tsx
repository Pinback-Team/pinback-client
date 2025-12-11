import dotori from '/assets/onBoarding/icons/dotori.svg';
import finalImg from '/assets/onBoarding/story/final.webp';
import extImg from '/assets/onBoarding/icons/ext.svg';
import pinImg from '/assets/onBoarding/icons/pin.svg';
const FinalStep = () => {
  return (
    <div className="flex h-full flex-col items-center">
      <img src={dotori} className="mb-[1.2rem]" alt="dotori" />
      <p className="head2 text-font-black-1">Pinback에 오신 걸 환영해요</p>
      <p className="body2-m text-font-gray-3 mb-[1.4rem] mt-[0.8rem] text-center">
        브라우저에서{' '}
        <img src={extImg} className="mx-[0.39rem] inline-block" alt="ext" />을
        선택한 다음{' '}
        <img src={pinImg} className="mx-[0.39rem] inline-block" alt="pin" />을
        선택하여 북마크를 빠르게 저장해보세요
      </p>
      <img src={finalImg} className="" alt="mac" />
    </div>
  );
};
export default FinalStep;
