import onBoardingBg from '../../assets/onBoarding/background/onBoardingBg.svg';
import Header from './components/header/Header';
const OnBoarding = () => {
  return (
    <div
      className={`relative h-screen w-screen bg-cover bg-center bg-no-repeat`}
      style={{ backgroundImage: `url(${onBoardingBg})` }}
    >
      <Header />
    </div>
  );
};

export default OnBoarding;
