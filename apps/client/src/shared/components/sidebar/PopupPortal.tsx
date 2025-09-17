import { createPortal } from 'react-dom';
import { useState } from 'react';
import { Popup } from '@pinback/design-system/ui';
import type { PopupState } from '@shared/hooks/useCategoryPopups';

interface Props {
  popup: PopupState;
  onClose: () => void;
  onChange?: (value: string) => void;
  onCreateConfirm?: () => void;
  onEditConfirm?: (id: number, draft?: string) => void;
  onDeleteConfirm?: (id: number) => void;
  categoryList?: { id: number; name: string }[];
}

export default function PopupPortal({
  popup,
  onClose,
  onChange,
  onCreateConfirm,
  onEditConfirm,
  onDeleteConfirm,
  categoryList,
}: Props) {
  const [draft, setDraft] = useState('');

  if (!popup) return null;

  const error = (() => {
    if (!popup || popup.kind === 'delete') return null;

    const value = draft.trim();
    if (!value) return null;

    if (value.length > 10) return '카테고리 이름은 10자 이내로 입력해주세요.';

    const isDuplicate = !!categoryList?.some(
      (category) =>
        category.name === value &&
        (popup.kind === 'create' || category.id !== popup.id)
    );
    return isDuplicate ? '이미 존재하는 카테고리 이름입니다.' : null;
  })();
  const handleInputChange = (value: string) => {
    setDraft(value);
    onChange?.(value);
  };

  const handleCreate = () => {
    if (error) return;
    onCreateConfirm?.();
  };

  const handleEdit = () => {
    if (error) return;
    if (popup.kind === 'edit') {
      onEditConfirm?.(popup.id, draft.trim());
    }
  };

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
            isError={Boolean(error)}
            helperText={error ?? ''}
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
            isError={Boolean(error)}
            helperText={error ?? ''}
            onInputChange={handleInputChange}
            defaultValue={popup.name}
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
            onRightClick={() => onDeleteConfirm?.(popup.id)}
          />
        )}
      </div>
    </div>,
    document.body
  );
}
