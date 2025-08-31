import SideItem from './SideItem';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}
export function NavItem({ href, icon, label, active }: NavItemProps) {
  return (
    <a
      href={href}
      className="block rounded-[0.8rem] focus:outline-none focus-visible:ring-2"
    >
      <SideItem icon={icon} label={label} active={active} />
    </a>
  );
}
