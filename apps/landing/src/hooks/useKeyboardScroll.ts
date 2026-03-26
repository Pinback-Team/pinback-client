import { RefObject, useEffect } from 'react';

export const useKeyboardScroll = (
  scrollRef: RefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const container = scrollRef.current;
      if (!container) return;

      // 포커스 된 요소가 입력 폼이나 버튼일 경우 무시
      const activeElement = document.activeElement as HTMLElement;
      const isInputFocused =
        ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A'].includes(
          activeElement.tagName
        ) || activeElement.isContentEditable;

      if (isInputFocused) return;

      const pageHeight = window.innerHeight;

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          container.scrollBy({ top: pageHeight, behavior: 'smooth' });
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          container.scrollBy({ top: -pageHeight, behavior: 'smooth' });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollRef]);
};
