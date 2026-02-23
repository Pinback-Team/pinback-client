import Lottie from 'lottie-react';
import Chippiface from '@assets/5_chippiface.json';

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
  useGetMyProfile,
} from '@shared/apis/queries';
import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import ProfilePopupPortal from '../profilePopup/ProfilePopupPortal';
import { AutoDismissToast } from '@pinback/design-system/ui';
import { Balloon } from '@shared/components/balloon/Balloon';

export function Sidebar() {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [acornToastOpen, setAcornToastOpen] = useState(false);
  const [acornToastKey, setAcornToastKey] = useState(0);
  const prevAcornRef = useRef<number | null>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: categories } = useGetDashboardCategories();
  const { mutate: patchCategory } = usePutCategory();
  const { mutate: createCategory } = usePostCategory();
  const { data, isPending } = useGetArcons();
  const { mutate: deleteCategory } = useDeleteCategory();
  const { data: googleProfileData } = useGetGoogleProfile();
  const { data: myProfile } = useGetMyProfile();

  const profileImageUrl = googleProfileData?.googleProfile || null;

  const chippiImageUrl = myProfile?.profileImage ?? null;
  const profileEmail = myProfile?.email ?? '';
  const profileName = myProfile?.name ?? '';
  const remindAt = myProfile?.remindAt ?? 'AM 09:00';

  const {
    activeTab,
    selectedCategoryId,
    goRemind,
    goBookmarks,
    selectCategory,
    goLevel,
    goJobPins,
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
      onError: () => setToastIsOpen(true),
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
        onError: () => setToastIsOpen(true),
      }
    );
  };

  const handleDeleteCategory = (id: number) => {
    deleteCategory(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['dashboardCategories'] });
        close();
      },
      onError: () => setToastIsOpen(true),
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

  useEffect(() => {
    if (isPending) return;

    if (prevAcornRef.current === null) {
      prevAcornRef.current = acornCount;
      return;
    }

    if (acornCount > prevAcornRef.current) {
      setAcornToastOpen(true);
      setAcornToastKey((k) => k + 1);
    }

    prevAcornRef.current = acornCount;
  }, [acornCount, isPending]);

  return (
    <aside className="bg-white-bg sticky top-0 h-screen w-[24rem] border-r border-gray-300">
      <div className="flex h-full flex-col px-[0.8rem]">
        {/* 헤더 */}
        <header className="flex items-center justify-between px-[0.8rem] py-[2.8rem]">
          <Icon
            name="logo"
            aria-label="Pinback 로고"
            className="h-[2.4rem] w-[8.7rem] cursor-pointer"
          />

          <button
            type="button"
            className="h-[3.6rem] w-[3.6rem] flex-shrink-0 overflow-hidden rounded-full border border-gray-200"
            onClick={() => setProfileOpen(true)}
          >
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="프로필"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gray-200" />
            )}
          </button>
        </header>

        <hr className="my-[0.8rem] border-gray-100" />

        {/* 메뉴 영역 */}
        <div className="flex-1 overflow-y-auto">
          <SideItem
            icon="pin"
            label="관심 직무 핀"
            active={activeTab === 'job-pins'}
            onClick={() => {
              closeMenu();
              goJobPins();
            }}
          />
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

        <footer className="relative pb-[2.8rem] pt-[1.2rem]">
          {isPending ? (
            <div className="h-[6.2rem] w-full animate-pulse rounded-[0.4rem] border bg-gray-100 p-[0.8rem]" />
          ) : (
            <>
              {acornToastOpen && (
                <div className="absolute bottom-[10.2rem] left-1/2 z-[50] -translate-x-1/2">
                  <AutoDismissToast
                    key={acornToastKey}
                    duration={3000}
                    fadeMs={200}
                    onClose={() => setAcornToastOpen(false)}
                  >
                    <Balloon variant="main" side="bottom">
                      <div className="flex w-[20rem] items-center gap-[1.2rem]">
                        <Lottie
                          animationData={Chippiface}
                          loop
                          autoplay
                          className="h-[4rem] w-[4rem] shrink-0"
                        />
                        <div className="caption2-m flex flex-col text-white">
                          <span>치삐가 방금</span>
                          <span>도토리 1개를 모았어요!</span>
                        </div>
                      </div>
                    </Balloon>
                  </AutoDismissToast>
                </div>
              )}

              <MyLevelItem
                acorns={acornCount}
                isActive={activeTab === 'level'}
                onClick={() => {
                  closeMenu();
                  setSelectedCategoryId(null);
                  goLevel();
                }}
              />
            </>
          )}
        </footer>
      </div>

      {/* 팝업 영역 */}
      <ProfilePopupPortal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        profileImage={chippiImageUrl}
        name={profileName}
        email={profileEmail}
        remindTime={remindAt}
      />

      <PopupPortal
        popup={popup}
        onClose={handlePopupClose}
        onChange={setNewCategoryName}
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
