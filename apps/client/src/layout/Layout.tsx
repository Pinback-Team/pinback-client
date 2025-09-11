import { Outlet } from 'react-router-dom';
import { Sidebar } from '../shared/components/sidebar/Sidebar';

const Layout = () => {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
