// Sidebar.tsx
import { NavLink } from 'react-router-dom';
import SideItem from './SideItem';
import AccordionItem from './AccordionItem';
import CategoryItem from './CategoryItem';
import CreateItem from './CreateItem';
import { useState } from 'react';

const CATEGORIES = [
  { id: 0, label: '전체' },
  { id: 1, label: '카테고리 1' },
  { id: 2, label: '카테고리 2' },
];

export function Sidebar() {
  // ✅ 선택 해제 상태까지 표현하려고 number | null 사용
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    0
  );

  return (
    <nav className="bg-white-bg w-[22.4rem] border-r border-gray-300 px-[0.8rem]">
      {/* 리마인드 클릭 시 선택 해제 */}
      <NavLink
        to="/"
        end
        className="block"
        onClick={() => setSelectedCategoryId(null)} // ⬅️ 여기서 풀기!
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
                  active={selectedCategoryId === c.id} // ✅ 현재 선택 반영
                  onClick={(id) => setSelectedCategoryId(id)} // ✅ 클릭 시 선택 갱신
                />
              ))}

              <CreateItem
                onClick={() => {
                  /* 카테고리 추가 로직 */
                }}
              />
            </ul>
          </AccordionItem>
        )}
      </NavLink>
    </nav>
  );
}
