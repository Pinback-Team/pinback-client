import { REMIND_MOCK_DATA } from '@pages/remind/constants';
import { Badge, Card } from '@pinback/design-system/ui';
import OptionsMenuButton from '@shared/components/optionsMenuButton/OptionsMenuButton';
import { useState } from 'react';

const MyBookmark = () => {
  const [activeBadge, setActiveBadge] = useState('all');

  const handleBadgeClick = (badgeType: string) => {
    setActiveBadge(badgeType);
  };
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <div className="flex flex-col py-[5.2rem] pl-[8rem]">
      <p className="head3">나의 북마크</p>
      <div className="mt-[3rem] flex gap-[2.4rem]">
        <Badge
          text="전체보기"
          countNum={5}
          onClick={() => handleBadgeClick('all')}
          isActive={activeBadge === 'all'}
        />
        <Badge
          text="안 읽음"
          countNum={10}
          onClick={() => handleBadgeClick('notRead')}
          isActive={activeBadge === 'notRead'}
        />
      </div>

      <div className="scrollbar-hide mt-[2.6rem] flex max-w-[104rem] flex-wrap gap-[1.6rem] overflow-y-auto scroll-smooth">
        {/* TODO: API 연결 후 수정 */}
        {REMIND_MOCK_DATA.map((data) => (
          <Card
            key={data.id}
            type="bookmark"
            title={data.title}
            content={data.content}
            category={data.category}
            date="2024.08.15"
            onClick={() => setPopupOpen(true)}
          />
        ))}
        {popupOpen && (
          <OptionsMenuButton
            onEdit={function (): void {
              throw new Error('Function not implemented.');
            }}
            onDelete={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MyBookmark;
