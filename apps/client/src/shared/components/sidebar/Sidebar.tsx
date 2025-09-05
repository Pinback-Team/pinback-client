import { createPortal } from 'react-dom';
import SideItem from './SideItem';
import AccordionItem from './AccordionItem';
import CategoryItem from './CategoryItem';
import CreateItem from './CreateItem';
import OptionsMenuButton from '@shared/components/optionsMenuButton/OptionsMenuButton';
import MyLevelItem from './MyLevelItem';
import { useAnchoredMenu } from '@shared/hooks/useAnchoredMenu';
import { rightOf } from '@shared/utils/anchorPosition';
import { useState } from 'react';
import { Icon } from '@pinback/design-system/icons';
import { useNavigate } from 'react-router-dom';

// 임시 데이터
const CATEGORIES = [
  { id: 0, label: '카테고리 0' },
  { id: 1, label: '카테고리 1' },
  { id: 2, label: '카테고리 2' },
  { id: 3, label: '카테고리 3' },
];

export function Sidebar() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<
    'mybookmark' | 'remind' | 'level' | null
  >('remind');

  const handleActiveTab = (tab: 'mybookmark' | 'remind' | 'level') => {
    setActiveTab(tab);
  };

  const navigate = useNavigate();

  const {
    state: menu,
    open: openMenu,
    close: closeMenu,
    containerRef,
    style,
  } = useAnchoredMenu((anchor) => rightOf(anchor, 30));

  return (
    <nav className="bg-white-bg sticky top-0 h-screen w-[22.4rem] overflow-y-auto border-r border-gray-300 px-[0.8rem]">
      <Icon
        name="logo"
        aria-label="Pinback 로고"
        className="my-[2.8rem] h-[2.4rem] w-[8.7rem]"
      />
      <hr className="my-[0.8rem] border-gray-100" />
      <SideItem
        icon="clock"
        label="리마인드"
        active={activeTab === 'remind'}
        onClick={() => {
          setSelectedCategoryId(null);
          handleActiveTab('remind');
          navigate('/');
        }}
      />

      <AccordionItem
        icon="bookmark"
        label="나의 북마크"
        active={activeTab === 'mybookmark'}
        defaultOpen
        onClick={() => {
          handleActiveTab('mybookmark');
          setSelectedCategoryId(null);
          navigate('/my-bookmarks');
        }}
      >
        <ul className="bg-none">
          {CATEGORIES.map((c) => (
            <CategoryItem
              key={c.id}
              id={c.id}
              label={c.label}
              active={selectedCategoryId === c.id}
              onClick={(id) => {
                setSelectedCategoryId(id);
                handleActiveTab('mybookmark');
              }}
              onOptionsClick={(id, el) => openMenu(id, el)}
            />
          ))}
          <CreateItem
            onClick={() => {
              /* TODO: 카테고리 추가 */
            }}
          />
        </ul>
      </AccordionItem>

      {menu.open &&
        style &&
        createPortal(
          <div ref={containerRef} style={style}>
            <OptionsMenuButton
              onEdit={() => {
                // TODO: 수정 로직
                closeMenu();
              }}
              onDelete={() => {
                // TODO: 삭제 로직
                closeMenu();
              }}
            />
          </div>,
          document.body
        )}

      <MyLevelItem
        acorns={0}
        active={activeTab === 'level'}
        onClick={() => {
          setSelectedCategoryId(null);
          handleActiveTab('level');
          navigate('/level');
        }}
        className="fixed bottom-[2.8rem]"
      />
    </nav>
  );
}
