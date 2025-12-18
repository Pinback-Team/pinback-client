import { Icon } from '@pinback/design-system/icons';
const SideInfoPop = () => {
  return (
    <div className="bg-white-bg common-shadow absolute left-[19.6rem] top-[6.8rem] z-10 flex h-[32rem] w-[26rem] flex-col items-center justify-center rounded-[12px] py-[2.4rem]">
      <img
        src="https://blog.kakaocdn.net/dna/kXF6L/btrt5yaCuuH/AAAAAAAAAAAAAAAAAAAAAEC2uoT7qWaQUOtDL18xi3PXMOakg5-QzqBlHNEzXJJv/%EC%B9%B4%ED%86%A1%20%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84%20%EC%82%AC%EC%A7%84(%EC%97%B0%EC%97%B0%EB%91%90ver).jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1767193199&allow_ip=&allow_referer=&signature=nnJLy%2F48M51zZd6WvzDD0VJiMZA%3D&attach=1&knm=img.jpg"
        className="my-[0.8rem] h-[13.2rem] w-[13.2rem] rounded-full"
        alt="유저 프로필 이미지"
      />
      <p className="sub1-sb text-font-black-1 mb-[0.4rem]">이름</p>
      <div className="flex flex-col items-center justify-center gap-[0.2rem]">
        <p className="body4-r text-font-gray-3">이메일</p>
        <div className="mb-[1.86em] flex justify-between gap-[0.4rem]">
          <Icon name="ic_clock_active" width={16} height={16} />
          <p className="caption2-m text-font-gray-3">리마인드 알람</p>
          <p className="caption2-m text-font-gray-3">AM 09:00</p>
        </div>
      </div>
      <button
        type="button"
        className="sub5-sb text-font-black-1 border-gray200 h-[3.6rem] w-[10.8rem] rounded-[4px] border py-[0.8rem] text-center"
      >
        로그아웃
      </button>
    </div>
  );
};
export default SideInfoPop;
