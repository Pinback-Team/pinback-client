import { Icon } from '@pinback/design-system/icons';
import { Button } from '@pinback/design-system/ui';
import { useQueryClient } from '@tanstack/react-query';
import formatRemindTime from '@shared/utils/formatRemindTime';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProfilePopupProps {
  open: boolean;
  onClose: () => void;
  profileImage: string | null;
  email: string;
  name: string;
  remindTime?: string;
}

export default function ProfilePopup({
  open,
  onClose,
  profileImage,
  email,
  name,
  remindTime,
}: ProfilePopupProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, onClose]);

  if (!open) return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    queryClient.clear();
    const sendExtensionLogout = () => {
      window.postMessage(
        {
          type: 'Extension-Logout',
        },
        window.location.origin
      );
    };
    sendExtensionLogout();
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-start justify-start pl-[19rem] pt-[7rem]">
      <div
        ref={popupRef}
        className="common-shadow flex w-[26rem] flex-col items-center rounded-[1.2rem] bg-white pb-[2.4rem] pt-[3.2rem]"
      >
        <div className="mb-[0.8rem] flex h-[13.2rem] w-[13.2rem] items-center justify-center overflow-hidden rounded-full bg-gray-100">
          {profileImage ? (
            <img
              src={profileImage}
              alt="프로필"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gray-200" />
          )}
        </div>

        <p className="sub1-sb">{name}</p>
        <p className="body4-r text-font-gray-3 mt-[0.8rem]">{email}</p>

        <div className="text-font-gray-3 mb-[1.6rem] flex items-center gap-[0.2rem]">
          <Icon name="ic_clock_active" width={18} height={18} />
          <span>리마인드 알람&nbsp;</span>
          <span className="caption2-m">{formatRemindTime(remindTime)}</span>
        </div>

        <div className="w-full px-[7.6rem]">
          <Button variant="secondary" size="small" onClick={handleLogout}>
            로그아웃
          </Button>
        </div>
      </div>
    </div>
  );
}
