import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '@shared/components/sidebar/Sidebar';
import { Suspense } from 'react';

const Layout = () => {
  const location = useLocation();
  const isOnboarding = location.pathname.startsWith('/onboarding');

  return (
    <>
      <div className="flex h-screen">
        {!isOnboarding && <Sidebar />}
        <main className="bg-gray-bg flex-1 overflow-y-auto">
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </>
  );
};

export default Layout;
