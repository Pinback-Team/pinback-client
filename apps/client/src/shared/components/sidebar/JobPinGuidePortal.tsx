import { createPortal } from 'react-dom';
import { Balloon } from '@shared/components/balloon/Balloon';

interface Props {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose?: () => void;
}

export default function JobPinGuidePortal({ anchorEl, open, onClose }: Props) {
  if (!open || !anchorEl) return null;

  const rect = anchorEl.getBoundingClientRect();

  return createPortal(
    <div
      style={{
        position: 'fixed',
        left: rect.right + 12,
        top: rect.top + rect.height / 2,
        transform: 'translateY(-50%)',
        zIndex: 10,
      }}
    >
      <Balloon variant="gray" side="left" onClose={onClose}>
        <div className="flex flex-col gap-[0.2rem] text-white">
          <span className="caption1-sb">새 기능이 생겼어요</span>
          <span className="body4-r">같은 직무의 사람들이</span>
          <span className="body4-r">북마크한 아티클을 살펴봐요</span>
        </div>
      </Balloon>
    </div>,
    document.body
  );
}
