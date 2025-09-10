import { createPortal } from 'react-dom';
import OptionsMenuButton from '@shared/components/optionsMenuButton/OptionsMenuButton';

interface OptionsMenuPortalProps {
  open: boolean;
  style?: React.CSSProperties | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  categoryId: number | null;
  getCategoryName: (id: number | null) => string;
  onEdit: (id: number, name: string) => void;
  onDelete: (id: number, name: string) => void;
  onClose: () => void;
}

export default function OptionsMenuPortal({
  open,
  style,
  containerRef,
  categoryId,
  getCategoryName,
  onEdit,
  onDelete,
  onClose,
}: OptionsMenuPortalProps) {
  if (!open || !style) return null;

  const id = categoryId;
  const name = getCategoryName(categoryId);

  return createPortal(
    <div ref={containerRef} style={{ ...style, zIndex: 10000 }}>
      <OptionsMenuButton
        onEdit={() => {
          if (id != null) onEdit(id, name);
          onClose();
        }}
        onDelete={() => {
          if (id != null) onDelete(id, name);
          onClose();
        }}
      />
    </div>,
    document.body
  );
}
