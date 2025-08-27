import { SidebarRow, type SidebarRowProps } from './SidebarRow';

export interface SidebarNavItemProps extends Omit<SidebarRowProps, 'onClick'> {
  href: string;
  isActive?: boolean;
  onNavigate?: () => void;
}

export function SidebarNavItem({
  href,
  isActive,
  onNavigate,
  ...row
}: SidebarNavItemProps) {
  return (
    <a href={href} onClick={onNavigate} className="block">
      <SidebarRow {...row} active={isActive} />
    </a>
  );
}
