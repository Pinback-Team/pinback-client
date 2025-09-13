import { Badge, Card } from '@pinback/design-system/ui';
import { useState } from 'react';
import { useGetRemindArticles } from './apis/queries';
import { formatLocalDateTime } from '@shared/utils/formatDateTime';

const Remind = () => {
  const [activeBadge, setActiveBadge] = useState('notRead');
  const formattedDate = formatLocalDateTime();

  const { data } = useGetRemindArticles(
    formattedDate,
    activeBadge === 'read',
    1,
    10
  );

  const handleBadgeClick = (badgeType: string) => {
    setActiveBadge(badgeType);
  };

  return (
    <div className="flex flex-col py-[5.2rem] pl-[8rem]">
      <p className="head3">리마인드</p>
      <div className="mt-[3rem] flex gap-[2.4rem]">
        <Badge
          text="안 읽음"
          countNum={data?.unreadArticleCount || 0}
          onClick={() => handleBadgeClick('notRead')}
          isActive={activeBadge === 'notRead'}
        />
        <Badge
          text="읽음"
          countNum={data?.readArticleCount || 0}
          onClick={() => handleBadgeClick('read')}
          isActive={activeBadge === 'read'}
        />
      </div>

      <div className="scrollbar-hide mt-[2.6rem] flex max-w-[104rem] flex-wrap gap-[1.6rem] overflow-y-auto scroll-smooth">
        {/* TODO: API 연결 후 수정 */}
        {data?.articles?.map((article) => (
          <Card
            key={article.articleId}
            type="remind"
            title={article.url}
            content={article.memo}
            timeRemaining={article.remindAt}
            category={article.category.categoryName}
          />
        ))}
      </div>
    </div>
  );
};

export default Remind;
