import Lottie from 'lottie-react';
import Chippiface from '../assets/5_chippiface.json';
import { Button } from '@pinback/design-system/ui';

const FinalCTASection = () => {
  return (
    <section className="bg-white-bg flex h-dvh w-full flex-col items-center justify-center gap-[6.4rem] overflow-hidden px-[17.2rem] text-center">
      <Lottie
        animationData={Chippiface}
        loop
        autoplay
        className="h-[32rem] w-[32rem]"
      />

      <div className="flex w-full flex-col items-center text-center">
        <p className="head1 mb-[3.1rem] text-black">
          다람쥐 치삐와 함께
          <br />
          도토리를 모아볼까요?
        </p>
        <div>
          {/* TODO : 랜딩페이디 크롬스토어 설치페이지로 링크 추후 수정 필요! */}
          <Button
            variant="primary"
            onClick={() => {
              window.location.href =
                'https://chromewebstore.google.com/detail/pinback-extension/engpidnjjbemfjmpcplchpfhokkgnbec?hl=ko&utm_source=ext_sidebar';
            }}
          >
            지금 시작하기
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
