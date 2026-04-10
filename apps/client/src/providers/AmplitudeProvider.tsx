import { analytics } from '@pinback/analytics';
import { useGetAmplitudeUserProperties } from '@shared/apis/queries';
import { useEffect, type PropsWithChildren } from 'react';

const AmplitudeProvider = ({ children }: PropsWithChildren) => {
  const { data: userProperties } = useGetAmplitudeUserProperties();

  useEffect(() => {
    if (!userProperties) return;
    analytics.identify(
      String(userProperties.userId),
      userProperties.jobRole ? { job_role: userProperties.jobRole } : undefined
    );
  }, [userProperties]);

  return <>{children}</>;
};

export default AmplitudeProvider;
