import Lottie from 'lottie-react';
import Progress from '../assets/4_up.json';

const FeatureRewardSection = () => {
  return (
    <section className="flex h-dvh items-center justify-center bg-white">
      <div className="flex items-center gap-[8rem]">
        {/* 텍스트 영역 */}
        <div className="flex flex-col items-start justify-end gap-[2.4rem] text-left">
          <p className="head1">도토리 보상 루프</p>
          <p className="sub2-sb text-font-gray-3">
            내가 저장했던 지식을 활용할 때마다 도토리를
            <br />
            모아 성장해보세요.
          </p>
        </div>

        {/* 이미지 영역 (로띠) */}
        <div className="flex items-center justify-center">
          <Lottie animationData={Progress} loop autoplay />
        </div>
      </div>
    </section>
  );
};

export default FeatureRewardSection;
