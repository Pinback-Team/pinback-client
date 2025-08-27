import { Outlet } from 'react-router-dom';
import OptionsMenuButton from '../shared/components/optionsMenuButton/OptionsMenuButton';

const Layout = () => {
  return (
    <>
      {/* TODO: 필요시 레이아웃 추가 */}
      {/* TODO: 사이드바 추가 */}
      <OptionsMenuButton />

      <Outlet />
    </>
  );
};

export default Layout;
