import Chippi from '@assets/chippi_extension_popup.svg';
import GoogleLogo from '/assets/onBoarding/icons/googleLogo.svg';
import { Link } from 'react-router-dom';
import { handleGoogleLogin } from '@shared/utils/handleGoogleLogin';
import { ROUTES_CONFIG } from '@routes/routesConfig';

const SocialLoginStep = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <img
        src={Chippi}
        alt="치삐 이미지"
        className="h-[19.4rem] w-[19.4rem] object-contain"
      />

      <h1 className="head2 text-font-black-1 mb-[0.8rem] text-center">
        치삐를 만나려면 로그인이 필요해요!
      </h1>

      <p className="body2-m text-font-gray-3 mb-[3.5rem] text-center">
        로그인하고 북마크한 정보를 리마인드를 받아보세요.
      </p>

      <button
        onClick={handleGoogleLogin}
        className="sub2-sb flex h-[5.2rem] w-[22.7rem] items-center justify-between gap-3 rounded-full border border-gray-100 bg-white px-[2rem]"
      >
        <img
          src={GoogleLogo}
          alt="구글 로고"
          className="h-[2.435rem] w-[2.435rem]"
        />
        구글 계정으로 로그인
      </button>
      <p className="text-font-gray-3 caption2-m mt-[2.4rem] text-center">
        가입 시 pinback의{' '}
        <Link
          to={ROUTES_CONFIG.termsOfService.path}
          className="underline underline-offset-2 hover:opacity-70"
        >
          이용 약관
        </Link>{' '}
        및{' '}
        <Link
          to={ROUTES_CONFIG.privacyPolicy.path}
          className="underline underline-offset-2 hover:opacity-70"
        >
          개인정보처리방침
        </Link>
        에 동의한 것으로 간주됩니다.
      </p>
    </div>
  );
};

export default SocialLoginStep;
