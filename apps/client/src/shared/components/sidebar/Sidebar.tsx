import { NavLink } from 'react-router-dom';
import SideItem from './SideItem';
import AccordionItem from './AccordionItem';
import CategoryItem from './CategoryItem';
import CreateItem from './CreateItem';

export function Sidebar() {
  return (
    <nav className="bg-white-bg w-[22.4rem] border-r border-gray-300 px-[0.8rem]">
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
            <ul className="bg-white-bg">
              <CategoryItem
                label="전체"
                active={true}
                onClick={function (): void {
                  throw new Error('Function not implemented.');
                }}
                id={0}
              />
              <CategoryItem
                label="카테고리 1"
                active={false}
                onClick={function (): void {
                  throw new Error('Function not implemented.');
                }}
                id={0}
              />
              <CategoryItem
                label="카테고리 2"
                active={false}
                onClick={function (): void {
                  throw new Error('Function not implemented.');
                }}
                id={0}
              />
              <CreateItem
                onClick={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </ul>
          </AccordionItem>
        )}
      </NavLink>
    </nav>
  );
}
