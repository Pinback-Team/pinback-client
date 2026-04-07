import type { AnalyticsProvider } from '../types';

export const noopProvider: AnalyticsProvider = {
  init: () => {},
  track: () => {},
  identify: (_userId: string) => {},
  reset: () => {},
};
