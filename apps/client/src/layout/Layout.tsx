import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar/Sidebar';

const Layout = () => {
  return (
    <>
      {/* TODO: 필요시 레이아웃 추가 */}
      {/* TODO: 사이드바 추가 */}
      <Sidebar />
      <Outlet />
    </>
  );
};

export default Layout;
