import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { AutoDismissToast, Popup, Toast } from '@pinback/design-system/ui';
import type { PopupState } from '@shared/hooks/useCategoryPopups';
import { graphemeLength } from '@shared/utils/grapheme';

interface Props {
  popup: PopupState | null;
  onClose: () => void;
  onChange?: (value: string) => void;
  onCreateConfirm?: () => void;
  onEditConfirm?: (id: number, draft?: string) => void;
  onDeleteConfirm?: (id: number) => void;
  categoryList?: { id: number; name: string }[];
  isToastOpen?: boolean;
  onToastClose?: () => void;
  toastKey?: number;
  toastAction?: 'create' | 'edit' | 'delete';
}

const MAX_LEN = 10;

export default function PopupPortal({
  popup,
  onClose,
  onChange,
  onCreateConfirm,
  onEditConfirm,
  onDeleteConfirm,
  categoryList,
  isToastOpen,
  onToastClose,
  toastKey,
  toastAction,
}: Props) {
  const [draft, setDraft] = useState('');

  useEffect(() => {
    if (!popup) return;
    setDraft(popup.kind === 'edit' ? (popup.name ?? '') : '');
  }, [popup]);

  if (!popup) return null;

  const value = draft.trim();
  const glen = graphemeLength(value);

  const isEmpty = popup.kind !== 'delete' && glen === 0;
  const isDuplicate =
    popup.kind !== 'delete' &&
    !!categoryList?.some(
      (c) => c.name === value && (popup.kind === 'create' || c.id !== popup.id)
    );

  let helperText = '';
  let isErrorUI = false;

  if (!isEmpty && popup.kind !== 'delete') {
    if (isDuplicate) {
      helperText = '이미 존재하는 카테고리 이름입니다.';
      isErrorUI = true;
    } else if (glen > MAX_LEN) {
      helperText = `카테고리 이름은 ${MAX_LEN}자 이내로 입력해주세요.`;
      isErrorUI = true;
    } else if (glen === MAX_LEN) {
      helperText = `최대 ${MAX_LEN}자까지 입력할 수 있어요.`;
      isErrorUI = false;
    }
  }

  const handleInputChange = (next: string) => {
    setDraft(next);
    onChange?.(next);
  };

  const blocked =
    popup.kind !== 'delete' && (isEmpty || isDuplicate || glen > MAX_LEN);

  const handleCreate = () => {
    if (blocked) return;
    onCreateConfirm?.();
  };

  const handleEdit = () => {
    if (blocked || popup.kind !== 'edit') return;
    onEditConfirm?.(popup.id, value);
  };

  const handleDelete = () => {
    if (popup.kind !== 'delete') return;
    onDeleteConfirm?.(popup.id);
  };

  const action = toastAction ?? (popup.kind as 'create' | 'edit' | 'delete');
  const actionLabel =
    action === 'create' ? '추가' : action === 'edit' ? '수정' : '삭제';

  return createPortal(
    <div className="fixed inset-0 z-[11000]">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute inset-0 grid place-items-center p-4">
        {popup.kind === 'create' && (
          <Popup
            type="input"
            title="카테고리 추가하기"
            left="취소"
            right="추가"
            isError={isErrorUI}
            helperText={helperText}
            inputValue={draft}
            onInputChange={handleInputChange}
            placeholder="카테고리 제목을 입력해주세요"
            onLeftClick={onClose}
            onRightClick={handleCreate}
          />
        )}

        {popup.kind === 'edit' && (
          <Popup
            type="input"
            title="카테고리 수정하기"
            left="취소"
            right="확인"
            isError={isErrorUI}
            helperText={helperText}
            inputValue={draft}
            onInputChange={handleInputChange}
            onLeftClick={onClose}
            onRightClick={handleEdit}
          />
        )}

        {popup.kind === 'delete' && (
          <Popup
            type="subtext"
            title="정말 삭제하시겠어요?"
            subtext="저장된 내용이 모두 삭제됩니다."
            left="취소"
            right="삭제"
            onLeftClick={onClose}
            onRightClick={handleDelete}
          />
        )}

        {isToastOpen && (
          <div className="absolute bottom-[23.4rem] left-1/2 -translate-x-1/2">
            <AutoDismissToast
              key={toastKey}
              duration={1000}
              fadeMs={500}
              onClose={onToastClose}
            >
              <Toast text={`${actionLabel}에 실패했어요.\n다시 시도해주세요`} />
            </AutoDismissToast>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
