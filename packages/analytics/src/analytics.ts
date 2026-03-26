import { noopProvider } from './providers/noop';
import type { AnalyticsProvider, UserProperties } from './types';

let provider: AnalyticsProvider = noopProvider;

export const analytics = {
  setProvider(newProvider: AnalyticsProvider): void {
    provider = newProvider;
  },
  track(eventName: string, properties?: Record<string, unknown>): void {
    provider.track(eventName, properties);
  },
  identify(userId: string, userProperties?: UserProperties): void {
    provider.identify(userId, userProperties);
  },
  reset(): void {
    provider.reset();
  },
};
