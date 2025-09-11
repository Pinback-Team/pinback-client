import { Badge, Card } from '@pinback/design-system/ui';
import { useState } from 'react';
import { REMIND_MOCK_DATA } from './constants';

const Remind = () => {
  const [activeBadge, setActiveBadge] = useState('notRead');

  const handleBadgeClick = (badgeType: string) => {
    setActiveBadge(badgeType);
  };

  return (
    <div className="flex flex-col pl-[8rem] py-[5.2rem]">
      <p className="head3">리마인드</p>
      <div className="mt-[3rem] flex gap-[2.4rem]">
        <Badge
          text="안 읽음"
          countNum={5}
          onClick={() => handleBadgeClick('notRead')}
          isActive={activeBadge === 'notRead'}
        />
        <Badge
          text="읽음"
          countNum={10}
          onClick={() => handleBadgeClick('read')}
          isActive={activeBadge === 'read'}
        />
      </div>

      <div className="scrollbar-hide mt-[2.6rem] flex flex-wrap gap-[1.6rem] overflow-y-auto scroll-smooth max-w-[104rem]">
        {/* TODO: API 연결 후 수정 */}
        {REMIND_MOCK_DATA.map((data) => (
          <Card
            key={data.id}
            type="remind"
            title={data.title}
            content={data.content}
            timeRemaining={data.timeRemaining}
            category={data.category}
          />
        ))}
      </div>
    </div>
  );
};

export default Remind;
