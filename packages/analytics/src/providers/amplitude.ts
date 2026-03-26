import { Identify, identify, setUserId, reset, track, initAll } from '@amplitude/unified';

import type { AnalyticsProvider, UserProperties } from '../types';

export const amplitudeProvider: AnalyticsProvider = {
  init(apiKey: string) {
    initAll(apiKey, {
      analytics: {
        autocapture: {
          attribution: true,
          pageViews: true,
          sessions: true,
          formInteractions: true,
          frustrationInteractions: {
            thrashedCursor: true,
            errorClicks: true,
            deadClicks: true,
            rageClicks: true,
          },
          fileDownloads: false,
          elementInteractions: false,
          networkTracking: false,
          webVitals: false,
        },
      },
      sessionReplay: {
        sampleRate: 1,
      },
    });
  },

  track(eventName: string, properties?: Record<string, unknown>) {
    track(eventName, properties);
  },

  identify(userId: string, userProperties?: UserProperties) {
    setUserId(userId);

    if (userProperties) {
      const identifyEvent = new Identify();
      Object.entries(userProperties).forEach(([key, value]) => {
        identifyEvent.set(key, value as string | number | boolean);
      });
      identify(identifyEvent);
    }
  },

  reset() {
    reset();
  },
};
