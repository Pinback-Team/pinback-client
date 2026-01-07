import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '@shared/components/sidebar/Sidebar';
import { ROUTES_CONFIG } from '@routes/routesConfig';

const Layout = () => {
  const location = useLocation();

  const isPolicyPage =
    location.pathname === ROUTES_CONFIG.privacyPolicy.path ||
    location.pathname === ROUTES_CONFIG.termsOfService.path;

  const isSidebarHidden =
    location.pathname.startsWith(ROUTES_CONFIG.onBoarding.path) ||
    location.pathname.startsWith(ROUTES_CONFIG.login.path) ||
    location.pathname.startsWith(ROUTES_CONFIG.onBoardingCallback.path) ||
    isPolicyPage;

  return (
    <>
      <div className="flex h-screen">
        {!isSidebarHidden && <Sidebar />}
        <main className="bg-gray-bg flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
