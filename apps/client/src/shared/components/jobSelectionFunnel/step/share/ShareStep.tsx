import shareStepImage from '/assets/jobSelectionFunnel/shareStep_description.svg';

const ShareStep = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-[4.4rem] flex flex-col items-center gap-[0.8rem]">
        <p className="head3 text-font-black-1">
          내가 저장한 아티클을 공유할 수 있어요
        </p>
        <p className="body2-m text-font-gray-3 text-center">
          카테고리를 공유해 다른 사용자들에게 내가 저장한 좋은 아티클을 보여줄
          수 있어요
        </p>
      </div>

      <div className="flex w-full items-center justify-center">
        <img
          src={shareStepImage}
          alt="카테고리 공유 안내"
          className="h-auto w-[57.6rem] max-w-full"
        />
      </div>
    </div>
  );
};

export default ShareStep;
