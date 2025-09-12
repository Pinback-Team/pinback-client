import { Badge, Card } from '@pinback/design-system/ui';
import { useState } from 'react';
import {
  useGetBookmarkArticles,
  useGetBookmarkUnreadArticles,
} from './apis/queries';

const MyBookmark = () => {
  const [activeBadge, setActiveBadge] = useState<'all' | 'notRead'>('all');

  const { data: readArticles } = useGetBookmarkArticles(1, 10);
  const { data: unreadArticles } = useGetBookmarkUnreadArticles(1, 10);

  const handleBadgeClick = (badgeType: 'all' | 'notRead') => {
    setActiveBadge(badgeType);
  };

  return (
    <div className="flex flex-col py-[5.2rem] pl-[8rem]">
      <p className="head3">나의 북마크</p>
      <div className="mt-[3rem] flex gap-[2.4rem]">
        <Badge
          text="전체보기"
          countNum={readArticles?.totalArticle || 0}
          onClick={() => handleBadgeClick('all')}
          isActive={activeBadge === 'all'}
        />
        <Badge
          text="안 읽음"
          countNum={readArticles?.totalUnreadArticle || 0}
          onClick={() => handleBadgeClick('notRead')}
          isActive={activeBadge === 'notRead'}
        />
      </div>

      <div className="scrollbar-hide mt-[2.6rem] flex max-w-[104rem] flex-wrap gap-[1.6rem] overflow-y-auto scroll-smooth">
        {/* TODO: API 연결 후 수정 */}
        {activeBadge === 'all' &&
          readArticles?.articles.map((article) => (
            <Card
              key={article.articleId}
              type="bookmark"
              title={article.url}
              content={article.memo}
              // category={article.category.categoryName}
              date={new Date(article.createdAt).toLocaleDateString('ko-KR')}
            />
          ))}

        {activeBadge === 'notRead' &&
          unreadArticles?.articles.map((article) => (
            <Card
              key={article.articleId}
              type="bookmark"
              title={article.url}
              content={article.memo}
              // category={article.}
              date={new Date(article.createdAt).toLocaleDateString('ko-KR')}
            />
          ))}
      </div>
    </div>
  );
};

export default MyBookmark;
