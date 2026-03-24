import Remind from '../assets/Remind.svg';

const FeatureReminderSection = () => {
  return (
    <section className="flex h-dvh items-center justify-center bg-white">
      <div className="flex items-start gap-[7rem]">
        {/* 이미지 영역 */}
        <div className="flex items-center justify-center">
          <img src={Remind} alt="Remind" />
        </div>
        {/* 글씨 영역 */}
        <div className="relative flex flex-1 flex-col items-end pr-[10rem] pt-[5rem] text-right">
          <h1 className="head1 text-font-black mb-[2.4rem]">
            잊지 않도록 리마인드
          </h1>
          <p className="sub2-sb text-font-gray-3">
            첫 실행 시 리마인드 주기를 설정해 놓치지 않고
            <br />
            읽을 수 있어요.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureReminderSection;
