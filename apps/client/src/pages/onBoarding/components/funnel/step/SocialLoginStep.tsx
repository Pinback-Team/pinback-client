import Chippi from '@assets/chippi_extension_popup.svg';
import GoogleLogo from '/assets/onBoarding/icons/googleLogo.svg';

const SocialLoginStep = () => {
  const handleGoogleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    // const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

    const redirectUri = import.meta.env.PROD
      ? import.meta.env.VITE_GOOGLE_REDIRECT_URI_PROD
      : import.meta.env.VITE_GOOGLE_REDIRECT_URI_DEV;

    if (!clientId || !redirectUri) {
      alert('Google OAuth 설정이 누락되었습니다.');
      return;
    }
    const googleAuthUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}` +
      `&redirect_uri=${redirectUri}` +
      `&response_type=code` +
      `&scope=email profile`;

    window.location.href = googleAuthUrl;
  };

  return (
    <div className="flex flex-col items-center justify-center pt-6">
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
    </div>
  );
};

export default SocialLoginStep;
