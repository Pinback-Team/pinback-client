export type PopupType = 'input' | 'subtext' | 'default';

export interface BasePopupProps {
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

export interface PopupContainerProps extends BasePopupProps {
  isOpen: boolean;
  onClose: () => void;
}
