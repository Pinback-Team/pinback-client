import CardImg from '@assets/card_img.svg';

export default function InfoCard() {
  return (
    <div className="common-shadow w-[24.6rem] rounded-[12px] px-[1.6rem] py-[2.4rem]">
      <p className="sub2-sb text-font-black-1 mb-[1.6rem]">
        치삐가 고치고 있어요 <span aria-hidden>🚧</span>
      </p>

      <div className="mb-[1.6rem]">
        <img src={CardImg} alt="메타 정보가 없을 때 표시되는 안내 이미지" />
      </div>

      <p className="caption2-m text-font-gray-3">
        현재 제목과 이미지 자동 불러오기 기능은 개선 중이에요. 저장한 콘텐츠를
        쉽게 구분하려면, 메모에 직접 제목이나 키워드를 기록해두면 더 편리해요
        <span aria-hidden>📝</span>.
      </p>
    </div>
  );
}
