// Sidebar.tsx
import { NavLink, useNavigate } from 'react-router-dom';
import SideItem from './components/SideItem';
import AccordionItem from './components/AccordionItem';
import { useSidebarActive } from '@shared/hooks/useSidebarActive';

export function Sidebar() {
  const navigate = useNavigate();
  const { isRemindActive, isBookmarkActive } = useSidebarActive();

  return (
    <nav className="space-y-2">
      <NavLink to="/" end className="block">
        <SideItem icon="clock" label="리마인드" active={isRemindActive} />
      </NavLink>

      <AccordionItem
        icon="bookmark"
        label="나의 북마크"
        active={isBookmarkActive}
        defaultOpen
        trailing
        onClick={() => navigate('/my-bookmarks')}
      >
        <ul className="bg-white-bg space-y-1">
          <li className="rounded px-3 py-2 hover:bg-white">카테고리 1</li>
          <li className="rounded px-3 py-2 hover:bg-white">카테고리 2</li>
          <button className="text-main500 rounded px-3 py-2 hover:bg-white">
            + 카테고리 추가
          </button>
        </ul>
      </AccordionItem>
    </nav>
  );
}
