import { Icon } from '@pinback/design-system/icons';
import LogOutImg from '/logout_chippi.svg';
const LogOutPop = () => {
  return (
    <div className="bg-white-bg common-shadow flex h-[35.5rem] w-[31.2rem] flex-col items-center justify-center rounded-[1.2rem] px-[3.2rem] py-[2.4rem]">
      <div className="mr-auto">
        <Icon name="main_logo" width={72} height={20} />
      </div>
      <div className="flex items-center justify-center pb-[1rem] pt-[0.8rem] text-center">
        <img
          src={LogOutImg}
          alt="로그아웃 치삐"
          className="h-[13.2rem] w-[13.2rem]"
        />
      </div>
      <p className="sub2-sb mb-[0.4rem] text-black">
        치삐를 만나려면 로그인이 필요해요!
      </p>
      <p className="body4-r text-font-gray-3 px-[4.15rem] text-center">
        지금 로그인하고 북마크한 정보의
        <br /> 리마인드 알람을 받아보세요
      </p>
      <button
        className="sub4-sb mt-[1.6rem] flex h-[4.4rem] w-[25.15rem] items-center justify-between rounded-full border border-gray-100 bg-white px-[2rem]"
        type="button"
        onClick={() => {
          chrome.tabs.create({
            url: 'https://www.pinback.today/onboarding?step=SOCIAL_LOGIN',
          });
        }}
      >
        <Icon name="google" width={21} height={21} />
        구글 계정으로 로그인/회원가입
      </button>
    </div>
  );
};
export default LogOutPop;
