import { createPortal } from 'react-dom';
import { Popup } from '@pinback/design-system/ui';
import type { PopupState } from '@shared/hooks/useCategoryPopups';

interface Props {
  popup: PopupState;
  onClose: () => void;
  onCreateConfirm?: () => void;
  onEditConfirm?: (id: number, draft?: string) => void;
  onDeleteConfirm?: (id: number) => void;
}

export default function PopupPortal({
  popup,
  onClose,
  onCreateConfirm,
  onEditConfirm,
  onDeleteConfirm,
}: Props) {
  if (!popup) return null;

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
            onLeftClick={onClose}
            onRightClick={() => onCreateConfirm?.()}
          />
        )}

        {popup.kind === 'edit' && (
          <Popup
            type="input"
            title="카테고리 수정하기"
            left="취소"
            right="확인"
            placeholder={popup.name}
            onLeftClick={onClose}
            onRightClick={() => onEditConfirm?.(popup.id)}
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
