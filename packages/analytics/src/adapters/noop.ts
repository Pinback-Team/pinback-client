import type { AnalyticsProvider } from '../types';

export const noopAdapter: AnalyticsProvider = {
  init: () => {},
  track: () => {},
  identify: (_userId: string) => {},
  reset: () => {},
};
