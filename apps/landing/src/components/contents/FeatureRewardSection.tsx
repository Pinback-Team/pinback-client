import Dotori from '../../assets/Dotori.svg';

const FeatureRewardSection = () => {
  return (
    <section className="flex h-dvh items-center justify-center bg-white">
      <div className="flex items-start gap-[24rem]">
        {/* 글씨 영역 */}
        <div className="flex flex-col items-start gap-[2.4rem] pl-[3rem] pt-[14rem] text-left">
          <h1 className="head1">도토리 보상 루프</h1>
          <p className="sub2-sb text-font-gray-3">
            내가 저장했던 지식을 활용할 때마다
            <br />
            도토리를 모아 성장해보세요.
          </p>
        </div>

        {/* 이미지 영역 */}
        <div className="flex items-center justify-center">
          <img src={Dotori} alt="도토리 수집 보상 이미지" />
        </div>
      </div>
    </section>
  );
};

export default FeatureRewardSection;
