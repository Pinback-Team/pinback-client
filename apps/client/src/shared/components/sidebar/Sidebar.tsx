import { Icon } from '@pinback/design-system/icons';
import SideItem from './SideItem';
import AccordionItem from './AccordionItem';
import CategoryItem from './CategoryItem';
import CreateItem from './CreateItem';
import MyLevelItem from './MyLevelItem';
import { useAnchoredMenu } from '@shared/hooks/useAnchoredMenu';
import { rightOf } from '@shared/utils/anchorPosition';
import { useSidebarNav } from '@shared/hooks/useSidebarNav';
import { useCategoryPopups } from '@shared/hooks/useCategoryPopups';
import OptionsMenuPortal from './OptionsMenuPortal';
import PopupPortal from './PopupPortal';
import { useGetDashboardCategories } from '@shared/components/sidebar/apis/queries';
import { useState } from 'react';

export function Sidebar() {
  const [newCategoryName, setNewCategoryName] = useState('');
  console.log(newCategoryName); // 임시 로그

  const { data: categories } = useGetDashboardCategories();
  const {
    activeTab,
    selectedCategoryId,
    goRemind,
    goBookmarks,
    selectCategory,
    goLevel,
    setSelectedCategoryId,
  } = useSidebarNav();

  const {
    state: menu,
    open: openMenu,
    close: closeMenu,
    containerRef,
    style,
  } = useAnchoredMenu((anchor) => rightOf(anchor, 30));

  const { popup, openCreate, openEdit, openDelete, close } =
    useCategoryPopups();

  const getCategoryName = (id: number | null) =>
    categories?.categories.find((category) => category.categoryId === id)
      ?.categoryName ?? '';

  const handleCategoryChange = (name: string) => {
    setNewCategoryName(name);
  };

  return (
    <aside className="bg-white-bg sticky top-0 h-screen w-[24rem] border-r border-gray-300">
      <div className="flex h-full flex-col px-[0.8rem]">
        <header className="py-[2.8rem]">
          <Icon
            name="logo"
            aria-label="Pinback 로고"
            className="h-[2.4rem] w-[8.7rem]"
          />
        </header>

        <hr className="my-[0.8rem] border-gray-100" />

        <div className="flex-1 overflow-y-auto">
          <SideItem
            icon="clock"
            label="리마인드"
            active={activeTab === 'remind'}
            onClick={() => {
              setSelectedCategoryId(null);
              closeMenu();
              goRemind();
            }}
          />

          <AccordionItem
            icon="bookmark"
            label="나의 북마크"
            active={activeTab === 'mybookmark'}
            defaultOpen
            onClick={() => {
              setSelectedCategoryId(null);
              closeMenu();
              goBookmarks();
            }}
          >
            <ul className="bg-none">
              {categories?.categories?.map((category) => (
                <CategoryItem
                  key={category.categoryId}
                  id={category.categoryId}
                  label={category.categoryName}
                  active={selectedCategoryId === category.categoryId}
                  onClick={(id) => {
                    closeMenu();
                    selectCategory(id);
                  }}
                  onOptionsClick={(id, el) => openMenu(id, el)}
                />
              ))}

              <CreateItem onClick={openCreate} />
            </ul>
          </AccordionItem>

          <OptionsMenuPortal
            open={menu.open}
            style={style ?? undefined}
            categoryId={menu.categoryId}
            getCategoryName={getCategoryName}
            onEdit={(id, name) => openEdit(id, name)}
            onDelete={(id, name) => openDelete(id, name)}
            onClose={closeMenu}
            containerRef={containerRef}
          />
        </div>

        <footer className="pb-[2.8rem] pt-[1.2rem]">
          <MyLevelItem
            acorns={0}
            isActive={activeTab === 'level'}
            onClick={() => {
              setSelectedCategoryId(null);
              closeMenu();
              goLevel();
            }}
          />
        </footer>
      </div>

      <PopupPortal
        popup={popup}
        onClose={close}
        onChange={handleCategoryChange}
        onCreateConfirm={() => {
          // TODO: 생성 API
          close();
        }}
        onEditConfirm={() => {
          // TODO: 수정 API
          close();
        }}
        onDeleteConfirm={() => {
          // TODO: 삭제 API
          close();
        }}
      />
    </aside>
  );
}
