import { createPortal } from 'react-dom';
import OptionsMenuButton from '@shared/components/optionsMenuButton/OptionsMenuButton';

interface OptionsMenuPortalProps {
  open: boolean;
  style?: React.CSSProperties | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  categoryId: number | null;

  getCategory: (id: number | null) => {
    id: number;
    name: string;
    isPublic: boolean;
  } | null;

  onEdit: (id: number, name: string, isPublic: boolean) => void;

  onDelete: (id: number, name: string) => void;
  onClose: () => void;
}

export default function OptionsMenuPortal({
  open,
  style,
  containerRef,
  categoryId,
  getCategory,
  onEdit,
  onDelete,
  onClose,
}: OptionsMenuPortalProps) {
  if (!open || !style) return null;

  const category = getCategory(categoryId);
  if (!category) return null;

  const { id, name, isPublic } = category;

  return createPortal(
    <div ref={containerRef} style={{ ...style, zIndex: 10000 }}>
      <OptionsMenuButton
        onEdit={() => {
          onEdit(id, name, isPublic);
          onClose();
        }}
        onDelete={() => {
          onDelete(id, name);
          onClose();
        }}
      />
    </div>,
    document.body
  );
}
