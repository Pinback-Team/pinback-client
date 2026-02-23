const pinStepImage = '/assets/jobSelectionFunnel/pinStep_description.svg';

const PinStep = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-[2.8rem] flex flex-col items-center gap-[0.8rem]">
        <p className="head3 text-font-black-1">
          관심 직무 핀이 새롭게 개설되었어요!
        </p>
        <p className="body2-m text-font-gray-3 text-center">
          우측 사이드바를 통해 탐색해보세요
        </p>
      </div>

      <div className="flex items-center justify-center">
        <img
          src={pinStepImage}
          alt="관심 직무 핀 안내"
          className="h-auto max-h-[28rem] w-[41.8rem] max-w-full object-contain"
        />
      </div>
    </div>
  );
};

export default PinStep;
