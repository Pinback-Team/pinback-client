import Chippi from '@assets/chippi_extension_popup.svg';
import GoogleLogo from '@assets/onBoarding/icons/googleLogo.svg';

const SocialLoginStep = () => {
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

      {/* 구글 로그인 버튼 */}
      <button
        onClick={() => {
          window.location.href = `/social-login?nextStep=4`;
        }}
        className="body1-m flex h-[52px] w-[22.7rem] items-center justify-between gap-3 rounded-full border border-gray-100 bg-white px-[2rem]"
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
