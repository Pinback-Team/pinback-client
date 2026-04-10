import { analytics } from './src/analytics';
import { amplitudeAdapter } from './src/adapters/amplitude';
import { consoleAdapter } from './src/adapters/console';

export type { AnalyticsProvider, UserProperties } from './src/types';
export type * from './src/ampli';
export { analytics };

interface InitAnalyticsOptions {
  apiKey: string;
  isDev: boolean;
}

export const initAnalytics = ({ apiKey, isDev }: InitAnalyticsOptions): void => {
  if (isDev || !apiKey) {
    analytics.setProvider(consoleAdapter);
    return;
  }

  try {
    amplitudeAdapter.init(apiKey);
    analytics.setProvider(amplitudeAdapter);
  } catch (error) {
    console.error('[Analytics] Failed to initialize Amplitude, falling back to console adapter', error);
    analytics.setProvider(consoleAdapter);
  }
};

// 타입된 이벤트(Ampli 등)로 처리하기 어려운 예외 케이스용 fallback
export const trackEvent = (
  eventName: string,
  properties?: Record<string, unknown>
): void => {
  analytics.track(eventName, properties);
};
