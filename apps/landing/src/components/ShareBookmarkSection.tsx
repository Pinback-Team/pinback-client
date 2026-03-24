import JobBookmark from '../assets/JobBookmark.svg';

const ShareBookmarkSection = () => {
  return (
    <section className="flex h-dvh items-center justify-center bg-white">
      <div className="flex items-start gap-[7rem]">
        {/* 이미지 영역 */}
        <div className="flex items-center justify-center">
          <img src={JobBookmark} alt="JobBookmark" />
        </div>
        {/* 글씨 영역 */}
        <div className="relative flex flex-1 flex-col items-end pr-[10rem] pt-[5rem] text-right">
          <div className="bg-main500 sub3-sb text-white-bg inline-flex items-center gap-[0.8rem] rounded-full px-[1.6rem] py-[0.8rem]">
            <span>새 기능이 출시됐어요!</span>
          </div>

          <h1 className="head1 text-font-black mb-[2.4rem] mt-[1.6rem]">
            나와 같은 IT 분야 사람들이
            <br />
            저장한 글을 확인해요
          </h1>
          <p className="sub2-sb text-font-gray-3">
            유용한 정보나 아티클을 쉽게 추천받을 수 있어요
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShareBookmarkSection;
