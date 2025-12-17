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
  useGetGoogleProfile,
} from '@shared/apis/queries';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export function Sidebar() {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [toastIsOpen, setToastIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: categories } = useGetDashboardCategories();
  const { mutate: patchCategory } = usePutCategory();
  const { mutate: createCategory } = usePostCategory();
  const { data, isPending } = useGetArcons();
  const { mutate: deleteCategory } = useDeleteCategory();
  const { data: googleProfileData } = useGetGoogleProfile();

  const profileImageUrl = googleProfileData?.googleProfile || null;

  const {
    activeTab,
    selectedCategoryId,
    goRemind,
    goBookmarks,
    selectCategory,
    goLevel,
    setSelectedCategoryId,
    setActiveTab,
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

  const moveNewCategory = (id: number) => {
    navigate(`/my-bookmarks?id=${id}&category=${newCategoryName}`);
    setActiveTab('mybookmark');
    setSelectedCategoryId(id);
  };

  const handleCreateCategory = () => {
    createCategory(newCategoryName, {
      onSuccess: () => {
        handleCategoryChange('');
        queryClient.invalidateQueries({ queryKey: ['dashboardCategories'] });
        close();
      },
      onError: () => {
        setToastIsOpen(true);
      },
    });
  };

  const handlePatchCategory = (id: number) => {
    patchCategory(
      { id, categoryName: newCategoryName },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['dashboardCategories'] });
          setNewCategoryName('');
          close();
          moveNewCategory(id);
        },
        onError: () => {
          setToastIsOpen(true);
        },
      }
    );
  };

  const handleDeleteCategory = (id: number) => {
    deleteCategory(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['dashboardCategories'] });
        close();
      },
      onError: () => {
        setToastIsOpen(true);
      },
    });
  };

  const handlePopupClose = () => {
    setToastIsOpen(false);
    close();
  };

  useEffect(() => {
    setToastIsOpen(false);
  }, [popup]);

  const acornCount = data?.acornCount ?? 0;
  const MAX_CATEGORIES = 10;
  const categoryCount = categories?.categories?.length ?? 0;
  const canCreateMore = categoryCount < MAX_CATEGORIES;

  return (
    <aside className="bg-white-bg sticky top-0 h-screen w-[24rem] border-r border-gray-300">
      <div className="flex h-full flex-col px-[0.8rem]">
        {/* TODO: 사이드바 프로필 클릭이벤트 추가 */}
        <header className="flex items-center justify-between px-[0.8rem] py-[2.8rem]">
          <Icon
            name="logo"
            aria-label="Pinback 로고"
            className="h-[2.4rem] w-[8.7rem] cursor-pointer"
          />
          <button
            className="h-[3.6rem] w-[3.6rem] flex-shrink-0 overflow-hidden rounded-full border border-gray-200"
            onClick={() => console.log('프로필 클릭', profileImageUrl)}
          >
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="프로필 이미지"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gray-200" />
            )}
          </button>
        </header>

        <hr className="my-[0.8rem] border-gray-100" />

        <div className="flex-1 overflow-y-auto">
          <SideItem
            icon="clock"
            label="리마인드"
            active={activeTab === 'remind'}
            onClick={() => {
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

              {canCreateMore && (
                <CreateItem
                  onClick={() => {
                    setToastIsOpen(false);
                    openCreate();
                  }}
                />
              )}
            </ul>
          </AccordionItem>

          <OptionsMenuPortal
            open={menu.open}
            style={style ?? undefined}
            categoryId={menu.categoryId}
            getCategoryName={getCategoryName}
            onEdit={(id, name) => {
              setToastIsOpen(false);
              openEdit(id, name);
            }}
            onDelete={(id, name) => {
              setToastIsOpen(false);
              openDelete(id, name);
            }}
            onClose={closeMenu}
            containerRef={containerRef}
          />
        </div>

        <footer className="pb-[2.8rem] pt-[1.2rem]">
          {isPending ? (
            <div className="h-[6.2rem] w-full animate-pulse rounded-[0.4rem] border bg-gray-100 p-[0.8rem]" />
          ) : (
            <MyLevelItem
              acorns={acornCount}
              isActive={activeTab === 'level'}
              onClick={() => {
                setSelectedCategoryId(null);
                closeMenu();
                goLevel();
              }}
            />
          )}
        </footer>
      </div>

      <PopupPortal
        popup={popup}
        onClose={handlePopupClose}
        onChange={handleCategoryChange}
        onCreateConfirm={handleCreateCategory}
        onEditConfirm={(id) => handlePatchCategory(id)}
        onDeleteConfirm={(id) => handleDeleteCategory(id)}
        categoryList={categories?.categories ?? []}
        isToastOpen={toastIsOpen}
        onToastClose={() => setToastIsOpen(false)}
      />
    </aside>
  );
}
