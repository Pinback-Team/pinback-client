export {};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * @param action 이벤트 이름임
 * @param category 이벤트 카테고리
 * @param label 이벤트 라벨
 * @param value 이벤트 값
 */
export const sendGAEvent = (
  action: string,
  category?: string,
  label?: string,
  value?: number
) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};

export const trackPageView = (title?: string) => {
  if (!window.gtag) return;
  window.gtag('event', '화면 접근', {
    page_title: title ?? document.title,
    page_path: window.location.pathname,
  });
};
