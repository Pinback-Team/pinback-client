import {
  analytics,
  type ImpressionSavedContentProperties,
} from '@pinback/analytics';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface AnalyticsCardWrapperProps {
  bookmarkType: ImpressionSavedContentProperties['bookmark_type'];
  children: React.ReactNode;
}

const AnalyticsCardWrapper = ({
  bookmarkType,
  children,
}: AnalyticsCardWrapperProps) => {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      analytics.track('Impression_Saved_Content', {
        bookmark_type: bookmarkType,
      });
    }
  }, [inView, bookmarkType]);

  return <div ref={ref}>{children}</div>;
};

export default AnalyticsCardWrapper;
