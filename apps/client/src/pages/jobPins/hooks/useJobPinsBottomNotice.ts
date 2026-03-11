import { useCallback, useEffect, useRef, useState } from 'react';

export const useJobPinsBottomNotice = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isBottomNoticeVisible, setIsBottomNoticeVisible] = useState(false);

  const showBottomNoticeTemporarily = useCallback(() => {
    if (isBottomNoticeVisible) {
      return;
    }

    setIsBottomNoticeVisible(true);
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }

    hideTimerRef.current = setTimeout(() => {
      setIsBottomNoticeVisible(false);
      hideTimerRef.current = null;
    }, 2000);
  }, [isBottomNoticeVisible]);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  const handleBottomWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (e.deltaY <= 0) {
        return;
      }

      const container = scrollContainerRef.current;
      if (!container) {
        return;
      }

      const isAtBottom =
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 1;

      if (isAtBottom) {
        showBottomNoticeTemporarily();
      }
    },
    [showBottomNoticeTemporarily]
  );

  return {
    scrollContainerRef,
    isBottomNoticeVisible,
    handleBottomWheel,
  };
};
