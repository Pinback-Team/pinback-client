import { REMIND_MOCK_DATA } from '@pages/remind/constants';
import { Badge, Card } from '@pinback/design-system/ui';
import OptionsMenuButton from '@shared/components/optionsMenuButton/OptionsMenuButton';
import { useState } from 'react';

const MyBookmark = () => {
  const [activeBadge, setActiveBadge] = useState('all');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const openMenu = (id: number) => {
    setSelectedId(id);
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setSelectedId(null);
  };

  const handleEdit = (id: number) => {
    // TODO: 편집 로직
    console.log('edit id =', id);
    closeMenu();
  };

  const handleDelete = (id: number) => {
    // TODO: 삭제 로직
    console.log('delete id =', id);
    closeMenu();
  };

  const handleBadgeClick = (badgeType: string) => {
    setActiveBadge(badgeType);
  };

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
            onClick={() => openMenu(data.id)}
          />
        ))}

        {menuOpen && selectedId !== null && (
          <OptionsMenuButton
            onEdit={() => handleEdit(selectedId)}
            onDelete={() => handleDelete(selectedId)}
          />
        )}
      </div>
    </div>
  );
};

export default MyBookmark;
