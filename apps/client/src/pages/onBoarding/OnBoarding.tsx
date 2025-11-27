import onBoardingBg from '/assets/onBoarding/background/onBoardingBg.webp';
import Header from './components/header/Header';
import MainCard from './components/funnel/MainCard';
import { useEffect } from 'react';
import { trackPageView } from '@pinback/design-system/ui';
const OnBoarding = () => {
  useEffect(() => {
    trackPageView('온보딩 페이지 방문');
  }, []);
  return (
    <div
      className={`relative flex h-screen w-screen items-center justify-center bg-cover bg-center bg-no-repeat`}
      style={{ backgroundImage: `url(${onBoardingBg})` }}
    >
      <Header />
      <MainCard />
    </div>
  );
};

export default OnBoarding;
