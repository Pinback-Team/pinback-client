// Sidebar.tsx
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import SideItem from './SideItem';
import AccordionItem from './AccordionItem';
import CategoryItem from './CategoryItem';
import CreateItem from './CreateItem';
import OptionsMenuButton from '@shared/components/optionsMenuButton/OptionsMenuButton';
import { useAnchoredMenu } from '@shared/hooks/useAnchoredMenu';
import { rightOf } from '@shared/utils/anchorPosition';
import { useState } from 'react';
import { Icon } from '@pinback/design-system/icons';

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
      <NavLink
        to="/"
        end
        className="block"
        onClick={() => {
          setSelectedCategoryId(null);
          closeMenu();
        }}
      >
        {({ isActive }) => (
          <SideItem icon="clock" label="리마인드" active={isActive} />
        )}
      </NavLink>

      <NavLink to="/my-bookmarks" className="block">
        {({ isActive }) => (
          <AccordionItem
            icon="bookmark"
            label="나의 북마크"
            active={isActive}
            defaultOpen
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
                    closeMenu();
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
        )}
      </NavLink>

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
    </nav>
  );
}
