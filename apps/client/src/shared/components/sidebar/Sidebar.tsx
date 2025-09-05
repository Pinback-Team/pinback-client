import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import SideItem from './SideItem';
import AccordionItem from './AccordionItem';
import CategoryItem from './CategoryItem';
import CreateItem from './CreateItem';
import OptionsMenuButton from '@shared/components/optionsMenuButton/OptionsMenuButton';

const CATEGORIES = [
  { id: 0, label: '전체' },
  { id: 1, label: '카테고리 1' },
  { id: 2, label: '카테고리 2' },
  { id: 3, label: '카테고리 3' },
];

type MenuState = {
  open: boolean;
  categoryId: number | null;
  anchorEl: HTMLElement | null;
  pos: { top: number; left: number } | null;
};

export function Sidebar() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    0
  );

  const [menu, setMenu] = useState<MenuState>({
    open: false,
    categoryId: null,
    anchorEl: null,
    pos: null,
  });

  // 위치 계산
  const calcPos = (anchor: HTMLElement) => {
    const r = anchor.getBoundingClientRect();
    return { top: r.top, left: r.right + 30 };
  };

  const openMenu = (id: number, anchorEl: HTMLElement) => {
    setMenu({
      open: true,
      categoryId: id,
      anchorEl,
      pos: calcPos(anchorEl),
    });
  };

  const closeMenu = () =>
    setMenu({ open: false, categoryId: null, anchorEl: null, pos: null });

  useEffect(() => {
    if (!menu.open) return;

    const handleScrollOrResize = () => {
      if (menu.anchorEl) {
        setMenu((m) => ({ ...m, pos: calcPos(menu.anchorEl!) }));
      }
    };
    const handleDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menu.anchorEl &&
        !menu.anchorEl.contains(target) &&
        !menuContainerRef.current?.contains(target)
      ) {
        closeMenu();
      }
    };

    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);
    document.addEventListener('mousedown', handleDocClick);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
      document.removeEventListener('mousedown', handleDocClick);
    };
  }, [menu.open, menu.anchorEl]);

  const menuContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <nav className="bg-white-bg w-[22.4rem] border-r border-gray-300 px-[0.8rem]">
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
            <ul className="bg-white-bg">
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
        menu.pos &&
        createPortal(
          <div
            ref={menuContainerRef}
            style={{
              position: 'fixed',
              top: menu.pos.top,
              left: menu.pos.left,
              zIndex: 9999,
            }}
          >
            <OptionsMenuButton
              onEdit={() => {
                // TODO: 편집 로직
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
