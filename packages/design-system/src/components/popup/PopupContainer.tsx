import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Popup from './Popup';
type PopupType = 'input' | 'subtext' | 'default';

interface BasePopupProps {
  type: PopupType;
  title: string;
  left: string;
  right: string;
  subtext?: string;
  placeholder?: string;
  isError?: boolean;
  helperText?: string;
  onLeftClick?: () => void;
  onRightClick?: () => void;
}
interface PopupContainerProps extends BasePopupProps {
  isOpen: boolean;
  onClose: () => void;
  inputValue?: string;
  onInputChange?: (value: string) => void;
}

const PopupContainer = ({
  isOpen,
  onClose,
  ...popupProps
}: PopupContainerProps): React.ReactNode => {
  // ESC 키로 닫는 것 정도 (외부 클릭은 안되게! : 어차피 x박스나 취소버튼이 있음)
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="absolute inset-0 bg-[#00000099]" />
      <div className="relative">
        <Popup 
          {...popupProps} 
          onLeftClick={onClose} 
          inputValue={popupProps.inputValue}
          onInputChange={popupProps.onInputChange} 
          />
      </div>
    </div>,
    document.body // body 위에서 렌더링 되게 함!
  ) as unknown as React.ReactElement;
};

export default PopupContainer;
