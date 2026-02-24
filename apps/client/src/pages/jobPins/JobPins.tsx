import { Card } from '@pinback/design-system/ui';
import Footer from '@pages/myBookmark/components/footer/Footer';

const MOCK_JOB_PINS = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  title: '텍스트텍스트텍스트텍스트텍스트텍스트텍스트',
  content: '서브텍스트입니다서브텍스트입니다서브텍스트입니다서브텍스트입니다',
  category: '카테고리명',
  categoryColor: 'COLOR7' as const,
  date: '2025.02.24',
}));

const JobPins = () => {
  return (
    <div className="flex h-screen flex-col pl-[8rem] pr-[5rem] pt-[5.2rem]">
      <div className="flex items-center gap-[1.2rem]">
        <p className="head3">관심 직무 핀</p>
        <p className="head3 text-main500">기획자</p>
      </div>
      <p className="body3-r text-font-gray-3 mt-[0.8rem]">
        같은 직무의 사람들이 저장한 아티클을 살펴봐요. 선택한 직무를 기준으로
        최신 핀이 업데이트 돼요!
      </p>

      <div className="scrollbar-hide mt-[2.6rem] flex h-screen flex-wrap content-start gap-[1.6rem] overflow-y-auto scroll-smooth">
        {MOCK_JOB_PINS.map((pin) => (
          <Card
            key={pin.id}
            type="bookmark"
            title={pin.title}
            content={pin.content}
            category={pin.category}
            categoryColor={pin.categoryColor}
            date={pin.date}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default JobPins;
