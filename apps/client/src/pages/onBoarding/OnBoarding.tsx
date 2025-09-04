import onBoardingBg from '../../assets/onBoarding/background/onBoardingBg.svg';
import Header from './components/header/Header';
import MainCard from './components/funnel/MainCard';
const OnBoarding = () => {
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
