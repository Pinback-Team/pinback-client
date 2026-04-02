import { useGetAmplitudeUserProperties } from '@shared/apis/queries';
import { authStorage } from '@shared/utils/authStorage';
import { analytics } from '@pinback/analytics';
import { router } from '@routes/router';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';

function App() {
  const isLoggedIn = authStorage.hasAccessToken();
  const { data: amplitudeProperties } = useGetAmplitudeUserProperties(isLoggedIn);

  useEffect(() => {
    if (!amplitudeProperties) return;
    analytics.identify(
      String(amplitudeProperties.userId),
      amplitudeProperties.jobRole ? { job_role: amplitudeProperties.jobRole } : undefined,
    );
  }, [amplitudeProperties]);

  return <RouterProvider router={router} />;
}

export default App;
