import onBoardingBg from '../../assets/onBoarding/background/onBoardingBg.svg';
const OnBoarding = () => {
  return (
    <div
      className={`h-screen w-screen bg-cover bg-center bg-no-repeat`}
      style={{ backgroundImage: `url(${onBoardingBg})` }}
    ></div>
  );
};

export default OnBoarding;
