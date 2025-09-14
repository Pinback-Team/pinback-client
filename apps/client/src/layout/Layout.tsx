import { Outlet,useLocation } from 'react-router-dom';
import { Sidebar } from '@shared/components/sidebar/Sidebar';

const Layout = () => {
  const location = useLocation();
  const isOnboarding = location.pathname.startsWith('/onboarding');

  return (
    <>
      <div className="flex h-screen">
         {!isOnboarding && <Sidebar />}
        <main className="bg-gray-bg flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
