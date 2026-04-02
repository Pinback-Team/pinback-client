import { analytics } from '@pinback/analytics';
import { router } from '@routes/router';
import { useGetAmplitudeUserProperties } from '@shared/apis/queries';
import { authStorage } from '@shared/utils/authStorage';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';

function App() {
  const isLoggedIn = authStorage.hasAccessToken();
  const { data: userProperties } = useGetAmplitudeUserProperties(isLoggedIn);

  useEffect(() => {
    if (!userProperties) return;
    analytics.identify(
      String(userProperties.userId),
      userProperties.jobRole ? { job_role: userProperties.jobRole } : undefined
    );
  }, [userProperties]);

  return <RouterProvider router={router} />;
}

export default App;
