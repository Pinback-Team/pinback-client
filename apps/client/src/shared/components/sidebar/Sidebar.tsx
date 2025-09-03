import { NavLink } from 'react-router-dom';
import SideItem from './SideItem';
import AccordionItem from './AccordionItem';

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
              <li className="h-[3.6rem]rounded h-[3.6rem] px-3 py-2 hover:bg-white">
                카테고리 1
              </li>
              <li className="h-[3.6rem] rounded px-3 py-2 hover:bg-white">
                카테고리 2
              </li>
              <li className="h-[3.6rem] rounded px-3 py-2 hover:bg-white">
                카테고리 2
              </li>
              <li className="h-[3.6rem] rounded px-3 py-2 hover:bg-white">
                카테고리 2
              </li>
              <li className="h-[3.6rem] rounded px-3 py-2 hover:bg-white">
                카테고리 2
              </li>
              <li className="h-[3.6rem] rounded px-3 py-2 hover:bg-white">
                카테고리 2
              </li>
              <li className="h-[3.6rem] rounded px-3 py-2 hover:bg-white">
                카테고리 2
              </li>
              <li className="h-[3.6rem] rounded px-3 py-2 hover:bg-white">
                카테고리 2
              </li>
              <li className="h-[3.6rem] rounded px-3 py-2 hover:bg-white">
                카테고리 2
              </li>
              <li className="h-[3.6rem] rounded px-3 py-2 hover:bg-white">
                카테고리 2
              </li>
              <button className="text-main500 rounded px-3 py-2 hover:bg-white">
                + 카테고리 추가
              </button>
            </ul>
          </AccordionItem>
        )}
      </NavLink>
    </nav>
  );
}
