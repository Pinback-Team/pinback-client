import OptionsMenuButton from '@shared/components/optionsMenuButton/OptionsMenuButton';
import { createPortal } from 'react-dom';

interface OptionsMenuPortalProps {
  open: boolean;
  style?: React.CSSProperties | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  categoryId: number | null;
  getCategoryName?: (id: number | null) => string;
  getCategory?: (id: number | null) => {
    id: number;
    name: string;
  } | null;
  onEdit: (id: number) => void;
  onDelete: (id: number, name: string) => void;
  onClose: () => void;
}

export default function OptionsMenuPortal({
  open,
  style,
  containerRef,
  categoryId,
  getCategoryName,
  getCategory,
  onEdit,
  onDelete,
  onClose,
}: OptionsMenuPortalProps) {
  if (!open || !style) return null;

  let id: number | null = categoryId;
  let name = '';

  if (getCategory) {
    const category = getCategory(categoryId);

    if (!category) return null;

    id = category.id;
    name = category.name;
  } else if (getCategoryName) {
    name = getCategoryName(categoryId);
  }

  return createPortal(
    <div
      ref={containerRef}
      style={{
        ...style,
        zIndex: 10000,
      }}
    >
      <OptionsMenuButton
        onEdit={() => {
          if (id != null) {
            onEdit(id);
          }
          onClose();
        }}
        onDelete={() => {
          if (id != null) {
            onDelete(id, name);
          }
          onClose();
        }}
      />
    </div>,
    document.body
  );
}
