import onBoardingBg from '/assets/onBoarding/background/onBoardingBg.webp';
import Header from '@pages/onBoarding/components/header/Header';
import Footer from '@pages/onBoarding/components/footer/Footer';
import { Icon } from '@pinback/design-system/icons';
import { handleGoogleLogin } from '@shared/utils/handleGoogleLogin';
import { Link } from 'react-router-dom';
import Chippi from '@assets/chippi_extension_popup.svg';
import GoogleLogo from '/assets/onBoarding/icons/googleLogo.svg';

const Login = () => {
  return (
    <div
      className="relative flex h-screen w-screen flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${onBoardingBg})` }}
    >
      <Header />

      <main className="flex w-full flex-1 items-center justify-center">
        <div className="bg-white-bg flex h-[54.8rem] w-[63.2rem] flex-col items-center justify-center rounded-[2.4rem] pt-[3.2rem]">
          <img
            src={Chippi}
            alt="치삐 이미지"
            className="mb-[1.6rem] h-[19.4rem] w-[19.4rem] object-contain"
          />

          <Icon name={'logo'} height={34} width={123} className="mb-[1.6rem]" />

          <h1 className="head2 text-font-black-1 mb-[0.8rem] text-center">
            가장 재미있게 북마크를 활용하는 방법
          </h1>

          <p className="body2-m text-font-gray-3 mb-[3.5rem] text-center">
            내가 저장해둔 영감을 pinback과 함께 열어볼까요?
          </p>

          <button
            onClick={handleGoogleLogin}
            className="sub2-sb flex h-[5.2rem] w-[29.8rem] items-center justify-between gap-3 rounded-full border border-gray-100 bg-white px-[2rem]"
          >
            <img
              src={GoogleLogo}
              alt="구글 로고"
              className="h-[2.435rem] w-[2.435rem]"
            />
            구글 계정으로 로그인/회원가입
          </button>

          <p className="text-font-gray-3 caption2-m mt-[2.4rem] text-center">
            가입 시 pinback의{' '}
            <Link
              to="/terms"
              className="underline underline-offset-2 hover:opacity-70"
            >
              이용 약관
            </Link>{' '}
            및{' '}
            <Link
              to="/privacy"
              className="underline underline-offset-2 hover:opacity-70"
            >
              개인정보처리방침
            </Link>
            에 동의한 것으로 간주됩니다.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
