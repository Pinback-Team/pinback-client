import Lottie from 'lottie-react';
import Bookmark from '../assets/2_bookmark.json';

const FeatureBookmarkSection = () => {
  return (
    <section className="flex h-dvh items-center justify-center bg-white">
      <div className="flex items-start justify-start gap-[8rem]">
        {/* 텍스트 영역 */}
        <div className="flex flex-col items-start gap-[2.4rem] text-left">
          <p className="head1">손쉽게 북마크하고 메모까지</p>
          <p className="sub2-sb text-font-gray-3">
            기억에 남기고 싶은 정보를 <br />
            빠르게 북마크하세요.
          </p>
        </div>

        {/* 이미지 영역 (로띠) */}
        <div className="flex items-center justify-center">
          <Lottie animationData={Bookmark} loop={true} autoplay={true} />
        </div>
      </div>
    </section>
  );
};

export default FeatureBookmarkSection;
