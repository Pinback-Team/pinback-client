export interface UserProperties {
  job_role?: string;
}

export interface AnalyticsProvider {
  init(apiKey: string): void;
  track(eventName: string, properties?: Record<string, unknown>): void;
  identify(userId: string, userProperties?: UserProperties): void;
  reset(): void;
}
