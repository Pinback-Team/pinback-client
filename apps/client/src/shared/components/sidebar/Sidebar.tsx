import { NavLink } from 'react-router-dom';
import SideItem from './SideItem';
import AccordionItem from './AccordionItem';
import CategoryItem from './CategoryItem';
import CreateItem from './CreateItem';

export function Sidebar() {
  return (
    <nav className="w-[22.4rem] space-y-2">
      <NavLink to="/" end className="block">
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
            <ul className="bg-white-bg space-y-1">
              <CategoryItem label="전체" active={true} />
              <CategoryItem label="카테고리 1" active={false} />
              <CategoryItem label="카테고리 2" active={false} />
              <CreateItem />
            </ul>
          </AccordionItem>
        )}
      </NavLink>
    </nav>
  );
}
