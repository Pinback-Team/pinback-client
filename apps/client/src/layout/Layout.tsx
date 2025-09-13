import { Outlet } from 'react-router-dom';
import { Sidebar } from '@shared/components/sidebar/Sidebar';

const Layout = () => {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <main className="bg-gray-bg flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
