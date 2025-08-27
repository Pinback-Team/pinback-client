import { SidebarNavItem } from './components/SidebarNavItem';
import { SidebarAccordion } from './components/SidebarAccordion';

export const Sidebar = () => {
  return (
    <div>
      <SidebarNavItem href={''} label={''}></SidebarNavItem>
      <SidebarAccordion
        header={undefined}
        children={undefined}
      ></SidebarAccordion>
    </div>
  );
};
