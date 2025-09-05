import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Icon } from '@pinback/design-system/icons';
import SideItem from './SideItem';
import AccordionItem from './AccordionItem';
import CategoryItem from './CategoryItem';
import CreateItem from './CreateItem';
import OptionsMenuButton from '@shared/components/optionsMenuButton/OptionsMenuButton';
import MyLevelItem from './MyLevelItem';
import { Popup } from '@pinback/design-system/ui';
import { useAnchoredMenu } from '@shared/hooks/useAnchoredMenu';
import { rightOf } from '@shared/utils/anchorPosition';

// 임시 데이터
const CATEGORIES = [
  { id: 0, label: '카테고리 0' },
  { id: 1, label: '카테고리 1' },
  { id: 2, label: '카테고리 2' },
  { id: 3, label: '카테고리 3' },
];

type PopupState =
  | { kind: 'create' }
  | { kind: 'edit'; id: number; name: string }
  | { kind: 'delete'; id: number; name: string }
  | null;

export function Sidebar() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<
    'mybookmark' | 'remind' | 'level' | null
  >('remind');
  const [popup, setPopup] = useState<PopupState>(null);

  const navigate = useNavigate();

  const {
    state: menu,
    open: openMenu,
    close: closeMenu,
    containerRef,
    style,
  } = useAnchoredMenu((anchor) => rightOf(anchor, 30));

  const openCreatePopup = () => setPopup({ kind: 'create' });
  const openEditPopup = (id: number, name: string) =>
    setPopup({ kind: 'edit', id, name });
  const openDeletePopup = (id: number, name: string) =>
    setPopup({ kind: 'delete', id, name });
  const closePopup = () => setPopup(null);

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
              setActiveTab('remind');
              closeMenu();
              navigate('/');
            }}
          />

          <AccordionItem
            icon="bookmark"
            label="나의 북마크"
            active={activeTab === 'mybookmark'}
            defaultOpen
            onClick={() => {
              setActiveTab('mybookmark');
              setSelectedCategoryId(null);
              closeMenu();
              navigate('/my-bookmarks');
            }}
          >
            <ul className="bg-none">
              {CATEGORIES.map((c) => (
                <CategoryItem
                  key={c.id}
                  id={c.id}
                  label={c.label}
                  active={selectedCategoryId === c.id}
                  onClick={(id) => {
                    setSelectedCategoryId(id);
                    setActiveTab('mybookmark');
                    closeMenu();
                    navigate(`/my-bookmarks?categoryId=${id}`);
                  }}
                  onOptionsClick={(id, el) => openMenu(id, el)}
                />
              ))}

              <CreateItem onClick={openCreatePopup} />
            </ul>
          </AccordionItem>

          {menu.open &&
            style &&
            createPortal(
              <div ref={containerRef} style={style} className="z-[10000]">
                <OptionsMenuButton
                  onEdit={() => {
                    const id = (menu.categoryId ?? undefined) as
                      | number
                      | undefined;
                    const name =
                      CATEGORIES.find((c) => c.id === id)?.label ?? '';
                    if (id !== undefined) openEditPopup(id, name);
                    closeMenu();
                  }}
                  onDelete={() => {
                    const id = (menu.categoryId ?? undefined) as
                      | number
                      | undefined;
                    const name =
                      CATEGORIES.find((c) => c.id === id)?.label ?? '';
                    if (id !== undefined) openDeletePopup(id, name);
                    closeMenu();
                  }}
                />
              </div>,
              document.body
            )}
        </div>

        <footer className="pb-[2.8rem] pt-[1.2rem]">
          <MyLevelItem
            acorns={0}
            active={activeTab === 'level'}
            onClick={() => {
              setSelectedCategoryId(null);
              setActiveTab('level');
              closeMenu();
              navigate('/level');
            }}
          />
        </footer>
      </div>

      {popup &&
        createPortal(
          <div className="fixed inset-0 z-[11000]">
            <div
              className="absolute inset-0 bg-black/60"
              onClick={closePopup}
            />
            <div className="absolute inset-0 grid place-items-center p-4">
              {popup.kind === 'create' && (
                <Popup
                  type="input"
                  title="카테고리 추가"
                  left="취소"
                  right="추가"
                  placeholder="카테고리 이름"
                  // isError={!newName.trim()}
                  // helperText={!newName.trim() ? '이름을 입력해주세요' : undefined}
                  onLeftClick={closePopup}
                  onRightClick={() => {
                    // TODO: 생성 API 호출
                    closePopup();
                  }}
                />
              )}

              {popup.kind === 'edit' && (
                <Popup
                  type="input"
                  title="카테고리 이름 수정"
                  left="취소"
                  right="수정"
                  placeholder={popup.name}
                  onLeftClick={closePopup}
                  onRightClick={() => {
                    // TODO: 수정 API 호출
                    closePopup();
                  }}
                />
              )}

              {popup.kind === 'delete' && (
                <Popup
                  type="subtext"
                  title="카테고리를 삭제할까요?"
                  subtext={`‘${popup.name}’을(를) 삭제하면 복구할 수 없어요.`}
                  left="취소"
                  right="삭제"
                  onLeftClick={closePopup}
                  onRightClick={() => {
                    // TODO: 삭제 API 호출
                    closePopup();
                  }}
                />
              )}
            </div>
          </div>,
          document.body
        )}
    </aside>
  );
}
