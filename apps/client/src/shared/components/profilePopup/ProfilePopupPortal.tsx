import { createPortal } from 'react-dom';
import ProfilePopup from './ProfilePopup';

interface ProfilePopupPortalProps {
  open: boolean;
  onClose: () => void;
  profileImage: string | null;
  email: string;
  name: string;
  remindTime?: string;
}

export default function ProfilePopupPortal({
  open,
  onClose,
  profileImage,
  email,
  name,
  remindTime,
}: ProfilePopupPortalProps) {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <ProfilePopup
      open={open}
      onClose={onClose}
      profileImage={profileImage}
      email={email}
      name={name}
      remindTime={remindTime}
    />,
    document.body
  );
}
