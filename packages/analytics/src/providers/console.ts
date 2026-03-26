import type { AnalyticsProvider } from '../types';

export const consoleProvider: AnalyticsProvider = {
  init: (apiKey) => console.log('[Analytics] init', { apiKey }),
  track: (name, props) => console.log('[Analytics] track', name, props ?? {}),
  identify: (userId) => console.log('[Analytics] identify', { userId }),
  reset: () => console.log('[Analytics] reset'),
};
