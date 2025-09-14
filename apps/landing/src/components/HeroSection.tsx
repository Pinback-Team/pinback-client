import { useEffect } from 'react';
import { Button } from '@pinback/design-system/ui';
import landingmain from '../assets/1_landingmain.json';
import Lottie from 'lottie-react';
import landing_bell from '../assets/landing_bell.svg';
import landing_icon from '../assets/landing_icon.svg';

const floatAnimationStyle = `
@keyframes floatY {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.float-animate {
  animation: floatY 2s ease-in-out infinite;
}
`;

const HeroSection = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = floatAnimationStyle;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section className="bg-white-bg flex h-dvh w-full flex-col items-center justify-center px-[17.2rem] text-center">
      {/* 텍스트 오버레이 */}
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row flex-nowrap items-end justify-center gap-[3rem]">
          <img src={landing_icon} alt="Landing Icon" />
          <Lottie
            animationData={landingmain}
            loop
            autoplay
            className="h-[413px] w-[480px]"
          />
          <img src={landing_bell} alt="Landing Icon" />
        </div>

        <div className="mb-[3.2rem] mt-[5.5rem] leading-snug">
          <p className="head1 text-gray900">차곡차곡 모아둔 북마크</p>
          <p className="head1 text-gray900">
            저장만 하지 말고 재미있게 활용 해 볼까요?
          </p>
        </div>

        <div className="float-animate">
          <Button
            variant="secondary"
            onClick={() => {
              document
                .querySelector('#bookmark-section')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            스트롤하기
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
