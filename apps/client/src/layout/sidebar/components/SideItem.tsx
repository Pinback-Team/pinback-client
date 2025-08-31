import { cn } from '@pinback/design-system/utils';
// SideItem.tsx (UI Shell)
interface SideItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  trailing?: React.ReactNode; // 우측 화살표/케밥 등
  asChild?: boolean; // button/a 감싸기용 (slot)
  className?: string;
}

export default function SideItem({
  icon,
  label,
  active,
  trailing,
  asChild,
  className,
}: SideItemProps) {
  const Cmp = asChild ? 'slot' : 'div'; // (라이브러리 slot 쓰면 대체)
  return (
    <Cmp
      className={cn(
        'flex items-center gap-3 rounded-[0.8rem] px-4 py-3',
        active ? 'bg-main0 text-main500' : 'hover:bg-gray0',
        className
      )}
    >
      <span>{icon}</span>
      <span className="sub2-b flex-1">{label}</span>
      {trailing}
    </Cmp>
  );
}
