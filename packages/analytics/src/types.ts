export interface UserProperties {
  email?: string;
  name?: string;
  [key: string]: unknown;
}

export interface AnalyticsProvider {
  init(apiKey: string): void;
  track(eventName: string, properties?: Record<string, unknown>): void;
  identify(userId: string, userProperties?: UserProperties): void;
  reset(): void;
}
