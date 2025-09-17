import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Popup } from '@pinback/design-system/ui';
import type { PopupState } from '@shared/hooks/useCategoryPopups';

interface Props {
  popup: PopupState;
  categories: { id: number; name: string }[];
  onClose: () => void;
  onChange?: (value: string) => void;
  onCreateConfirm?: (value: string) => void;
  onEditConfirm?: (id: number, draft?: string) => void;
  onDeleteConfirm?: (id: number) => void;
}

export default function PopupPortal({
  popup,
  categories,
  onClose,
  onCreateConfirm,
  onEditConfirm,
  onDeleteConfirm,
}: Props) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!popup) return null;
  const validate = (val: string) => {
    if (val.length > 10) {
      setError('10자 이하로 입력해주세요');
    } else if (
      categories.some(
        (c) =>
          c.name === val &&
          // edit 시에는 자기 자신은 허용
          (popup.kind !== 'edit' || c.id !== popup.id)
      )
    ) {
      setError('이미 존재하는 카테고리입니다');
    } else {
      setError(null);
    }
  };

  const handleChange = (val: string) => {
    setValue(val);
    validate(val);
  };

  const handleCreate = () => {
    if (!error && value.trim()) {
      onCreateConfirm?.(value);
    }
  };

  const handleEdit = () => {
    if (!error && value.trim() && popup.kind === 'edit') {
      onEditConfirm?.(popup.id, value);
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
            placeholder="카테고리 제목을 입력해주세요"
            inputValue={value}
            helperText="(최대 10자)"
            isError={!!error}
            errortext={error || undefined}
            onInputChange={handleChange}
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
            defaultValue={popup.name}
            inputValue={value || popup.name}
            isError={!!error}
            errortext={error || undefined}
            onInputChange={handleChange}
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
