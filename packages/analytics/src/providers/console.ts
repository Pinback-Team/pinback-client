import type { AnalyticsProvider } from '../types';

export const consoleProvider: AnalyticsProvider = {
  init: (_apiKey) => console.log('[Analytics] init'),
  track: (name, props) => console.log('[Analytics] track', name, props ?? {}),
  identify: (userId, userProperties) => console.log('[Analytics] identify', { userId, ...userProperties }),
  reset: () => console.log('[Analytics] reset'),
};
