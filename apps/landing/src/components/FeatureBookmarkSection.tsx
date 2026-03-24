import Bookmark from '../assets/Bookmark.png';

const FeatureBookmarkSection = () => {
  return (
    <section className="flex h-dvh items-center justify-center bg-white">
      <div className="flex items-start gap-[7rem]">
        {/* 글씨 영역 */}
        <div className="flex flex-col items-start gap-[2.4rem] pl-[3rem] pt-[14rem] text-left">
          <p className="head1">손쉽게 북마크하고 메모까지</p>
          <p className="sub2-sb text-font-gray-3">
            기억에 남기고 싶은 정보를 <br />
            빠르게 북마크하세요.
          </p>
        </div>

        {/* 이미지 영역 */}
        <div className="flex items-center justify-center">
          <img src={Bookmark} alt="Bookmark" width={447} height={490} />
        </div>
      </div>
    </section>
  );
};

export default FeatureBookmarkSection;
