export {};

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    __gtagInitialized?: boolean;
  }
}

/**
 * gtag 로드 상태를 감지
 */
const ensureGtagReady = async (maxRetry = 10, delay = 300) => {
  for (let i = 0; i < maxRetry; i++) {
    if (typeof window.gtag === 'function') return true;
    await new Promise((res) => setTimeout(res, delay));
  }
  console.warn('⚠️ gtag not loaded after retries');
  return false;
};

/**
 * GA 이벤트 전송
 */
export const sendGAEvent = async (
  action: string,
  category?: string,
  label?: string,
  value?: number
) => {
  const ready = await ensureGtagReady();
  if (!ready || !window.gtag) return;

  if (window.__gtagInitialized) return;
  window.__gtagInitialized = true;
  setTimeout(() => (window.__gtagInitialized = false), 200); // 0.2초 뒤 리셋

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};

/**
 * 페이지뷰 트래킹
 */
export const trackPageView = async (title?: string) => {
  const ready = await ensureGtagReady();
  if (!ready || !window.gtag) return;

  if (window.__gtagInitialized) return;
  window.__gtagInitialized = true;
  setTimeout(() => (window.__gtagInitialized = false), 200);

  window.gtag('event', 'page_view', {
    page_title: title ?? document.title,
    page_path: window.location.pathname,
  });
};
