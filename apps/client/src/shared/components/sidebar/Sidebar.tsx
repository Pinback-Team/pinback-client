import Chippiface from '@assets/5_chippiface.json';
import { Icon } from '@pinback/design-system/icons';
import { AutoDismissToast } from '@pinback/design-system/ui';
import {
  useGetAcorns,
  useGetCategoryDetail,
  useGetDashboardCategories,
  useGetGoogleProfile,
  useGetMyProfile,
} from '@shared/apis/queries';
import { Balloon } from '@shared/components/balloon/Balloon';
import { useAnchoredMenu } from '@shared/hooks/useAnchoredMenu';
import { useCategoryPopups } from '@shared/hooks/useCategoryPopups';
import { useSidebarNav } from '@shared/hooks/useSidebarNav';
import { rightOf } from '@shared/utils/anchorPosition';
import Lottie from 'lottie-react';
import { useEffect, useRef, useState } from 'react';
import ProfilePopupPortal from '../profilePopup/ProfilePopupPortal';
import AccordionItem from './AccordionItem';
import CategoryItem from './CategoryItem';
import CreateItem from './CreateItem';
import { useCategoryActions } from './hooks/useCategoryActions';
import JobPinGuidePortal from './JobPinGuidePortal';
import MyLevelItem from './MyLevelItem';
import OptionsMenuPortal from './OptionsMenuPortal';
import PopupPortal from './PopupPortal';
import SideItem from './SideItem';

export function Sidebar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [acornToastOpen, setAcornToastOpen] = useState(false);
  const [acornToastKey, setAcornToastKey] = useState(0);
  const prevAcornRef = useRef<number | null>(null);

  const jobPinRef = useRef<HTMLDivElement | null>(null);
  const [guideOpen, setGuideOpen] = useState(false);

  const { mutate: getCategoryDetail, data: categoryDetail } =
    useGetCategoryDetail();

  const { data: categories } = useGetDashboardCategories();
  const { data, isPending: isAcornPending } = useGetAcorns();
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

  const {
    toastIsOpen,
    setToastIsOpen,
    handleCategoryChange,
    handleCreateCategory,
    handlePatchCategory,
    handleDeleteCategory,
    handlePopupClose,
  } = useCategoryActions({
    close,
    setActiveTab,
    setSelectedCategoryId,
  });

  useEffect(() => {
    setToastIsOpen(false);
  }, [popup, setToastIsOpen]);

  useEffect(() => {
    const hasJob = localStorage.getItem('hasJob') === 'true';
    const guideClosed = localStorage.getItem('jobPinGuideClosed') === 'true';

    if (hasJob && !guideClosed) {
      setGuideOpen(true);
    }
  }, []);

  const acornCount = data?.acornCount ?? 0;

  const MAX_CATEGORIES = 10;
  const categoryCount = categories?.categories?.length ?? 0;
  const canCreateMore = categoryCount < MAX_CATEGORIES;

  useEffect(() => {
    if (isAcornPending) return;

    if (prevAcornRef.current === null) {
      prevAcornRef.current = acornCount;
      return;
    }

    if (acornCount > prevAcornRef.current) {
      setAcornToastOpen(true);
      setAcornToastKey((k) => k + 1);
    }

    prevAcornRef.current = acornCount;
  }, [acornCount, isAcornPending]);

  const getCategory = (id: number | null) => {
    const c = categories?.categories.find((c) => c.id === id) ?? null;
    if (!c) return null;
    return { id: c.id, name: c.name, isPublic: (c as any).isPublic ?? true };
  };

  return (
    <aside className="bg-white-bg sticky top-0 h-screen w-[24rem] border-r border-gray-300">
      <div className="flex h-full flex-col px-[0.8rem]">
        {/* Header */}
        <header className="flex items-center justify-between px-[0.8rem] py-[2.8rem]">
          <Icon name="logo" className="h-[2.4rem] w-[8.7rem]" />

          <button
            type="button"
            className="h-[3.6rem] w-[3.6rem] overflow-hidden rounded-full border"
            onClick={() => setProfileOpen(true)}
          >
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gray-200" />
            )}
          </button>
        </header>

        <hr className="my-[0.8rem] border-gray-100" />

        {/* Menu */}
        <div className="flex-1 overflow-y-auto">
          <div ref={jobPinRef}>
            <SideItem
              icon="pin"
              label="관심 직무 핀"
              active={activeTab === 'job-pins'}
              onClick={() => {
                closeMenu();
                goJobPins();
              }}
            />
          </div>

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
            <ul>
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

              {canCreateMore && <CreateItem onClick={() => openCreate()} />}
            </ul>
          </AccordionItem>
          <OptionsMenuPortal
            open={menu.open}
            style={style}
            categoryId={menu.categoryId}
            getCategory={getCategory}
            onEdit={(id) => {
              getCategoryDetail(id, {
                onSuccess: (data) => {
                  openEdit(data.categoryId, data.categoryName, data.isPublic);
                },
              });

              closeMenu();
            }}
            onDelete={(id, name) => openDelete(id, name)}
            onClose={closeMenu}
            containerRef={containerRef}
          />
        </div>

        {/* Footer */}
        <footer className="relative pb-[2.8rem] pt-[1.2rem]">
          {!isAcornPending && (
            <>
              {acornToastOpen && (
                <div className="absolute bottom-[10.2rem] left-1/2 -translate-x-1/2">
                  <AutoDismissToast
                    key={acornToastKey}
                    duration={3000}
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

      {/* Profile Popup */}
      <ProfilePopupPortal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        profileImage={chippiImageUrl}
        name={profileName}
        email={profileEmail}
        remindTime={remindAt}
      />

      {/* Category Popup */}
      <PopupPortal
        key={popup?.kind === 'edit' ? popup.id : popup?.kind}
        popup={popup}
        onClose={handlePopupClose}
        onChange={handleCategoryChange}
        onCreateConfirm={handleCreateCategory}
        onEditConfirm={(id, name, isPublic) =>
          handlePatchCategory(id, name, isPublic)
        }
        onDeleteConfirm={(id) => handleDeleteCategory(id)}
        categoryList={categories?.categories ?? []}
        isToastOpen={toastIsOpen}
        onToastClose={() => setToastIsOpen(false)}
      />

      {/* JobPin Guide Tutorial */}
      <JobPinGuidePortal
        anchorEl={jobPinRef.current}
        open={guideOpen}
        onClose={() => {
          setGuideOpen(false);
          localStorage.setItem('jobPinGuideClosed', 'true');
        }}
      />
    </aside>
  );
}
