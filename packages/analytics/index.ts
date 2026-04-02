import { analytics } from './src/analytics';
import { amplitudeProvider } from './src/providers/amplitude';
import { consoleProvider } from './src/providers/console';

export type { AnalyticsProvider, UserProperties } from './src/types';
export { analytics };

interface InitAnalyticsOptions {
  apiKey: string;
  isDev: boolean;
}

export const initAnalytics = ({ apiKey, isDev }: InitAnalyticsOptions): void => {
  if (isDev || !apiKey) {
    analytics.setProvider(consoleProvider);
    return;
  }

  try {
    amplitudeProvider.init(apiKey);
    analytics.setProvider(amplitudeProvider);
  } catch (error) {
    console.error('[Analytics] Failed to initialize Amplitude, falling back to console provider', error);
    analytics.setProvider(consoleProvider);
  }
};

// 타입된 이벤트(Ampli 등)로 처리하기 어려운 예외 케이스용 fallback
export const trackEvent = (
  eventName: string,
  properties?: Record<string, unknown>
): void => {
  analytics.track(eventName, properties);
};
