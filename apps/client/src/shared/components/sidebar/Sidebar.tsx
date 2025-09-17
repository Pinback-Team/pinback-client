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
import {
  useGetDashboardCategories,
  usePostCategory,
  useGetArcons,
  usePutCategory,
  useDeleteCategory,
} from '@shared/apis/queries';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export function Sidebar() {
  const [newCategoryName, setNewCategoryName] = useState('');
  const queryClient = useQueryClient();

  const { data: categories } = useGetDashboardCategories();
  const { mutate: patchCategory } = usePutCategory();
  const { mutate: createCategory } = usePostCategory();
  const { data, isPending, isError } = useGetArcons();
  const { mutate: deleteCategory } = useDeleteCategory();

  const {
    activeTab,
    selectedCategoryId,
    goRemind,
    goBookmarks,
    selectCategory,
    goLevel,
    setSelectedCategoryId,
  } = useSidebarNav();

  const { popup, openCreate, openEdit, openDelete, close } =
    useCategoryPopups();

  const {
    state: menu,
    open: openMenu,
    close: closeMenu,
    containerRef,
    style,
  } = useAnchoredMenu((anchor) => rightOf(anchor, 30));

  const getCategoryName = (id: number | null) =>
    categories?.categories.find((category) => category.id === id)?.name ?? '';

  const handleCategoryChange = (name: string) => {
    setNewCategoryName(name);
  };

  const handleCreateCategory = () => {
    createCategory(newCategoryName, {
      onSuccess: () => {
        handleCategoryChange('');
        queryClient.invalidateQueries({ queryKey: ['dashboardCategories'] });
        close();
      },
      onError: (error) => {
        console.error('카테고리 생성 실패:', error);
      },
    });
  };
  const handlePatchCategory = (id: number) => {
    patchCategory(
      { id, categoryName: newCategoryName },
      {
        onSuccess: () => {
          setNewCategoryName('');
          queryClient.invalidateQueries({ queryKey: ['dashboardCategories'] });
          close();
        },
        onError: (error) => console.error('카테고리 수정 실패:', error),
      }
    );
  };

  const handleDeleteCategory = (id: number) => {
    deleteCategory(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['dashboardCategories'] });
        close();
      },
      onError: (error) => {
        console.error('카테고리 삭제 실패:', error);
      },
    });
  };

  if (isPending) return <div></div>;
  if (isError) return <div></div>;
  const acornCount = data.acornCount;

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
                  key={category.id}
                  id={category.id}
                  label={category.name}
                  active={selectedCategoryId === category.id}
                  onClick={(id) => {
                    closeMenu();
                    selectCategory(id, category.name);
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
            acorns={acornCount}
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
        onCreateConfirm={handleCreateCategory}
        onEditConfirm={(id) => handlePatchCategory(id)}
        onDeleteConfirm={(id) => handleDeleteCategory(id)}
      />
    </aside>
  );
}
