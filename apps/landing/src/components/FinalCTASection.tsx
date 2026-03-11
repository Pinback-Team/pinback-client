import Lottie from 'lottie-react';
import Chippiface from '../assets/5_chippiface.json';
import { sendGAEvent, Button } from '@pinback/design-system/ui';
import Footer from './Footer';
const FinalCTASection = () => {
  const handleInstallClick = () => {
    sendGAEvent('landing', 'landing', '2-landing-bottomBtn');
    window.location.href =
      'https://chromewebstore.google.com/detail/pinback-extension/engpidnjjbemfjmpcplchpfhokkgnbec?hl=ko&utm_source=ext_sidebar';
  };

  return (
    <div className="relative flex h-dvh flex-col">
      <section className="bg-white-bg mt-[10.3rem] flex w-full flex-col items-center justify-center gap-[2rem] overflow-hidden px-[17.2rem] text-center">
        <Lottie
          animationData={Chippiface}
          loop
          autoplay
          className="h-[32rem] w-[32rem]"
        />

        <div className="flex w-full flex-col items-center text-center">
          <p className="head1 mb-[3.2rem] text-black">
            다람쥐 치삐와 함께
            <br />
            도토리를 모아볼까요?
          </p>
          <div>
            <Button variant="primary" onClick={handleInstallClick} size="large">
              지금 시작하기
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FinalCTASection;
