// SideItem.tsx
import { cn } from '@pinback/design-system/utils';
import { Icon } from '@pinback/design-system/icons';

interface SideItemProps {
  /** 기본 아이콘 (닫힘/비활성) */
  iconName: string;
  /** 활성/열림 상태에서 쓸 아이콘 (없으면 iconName 그대로) */
  activeIconName?: string;

  label: string;
  active?: boolean; // 스타일/아이콘 선택에만 사용
  trailing?: React.ReactNode; // 우측 화살표/케밥 등
  className?: string;
}

export function SideItem({
  activeIconName,
  label,
  active,
  trailing,
  className,
}: SideItemProps) {
  const currentIcon =
    active && activeIconName ? 'ic_clock_disable' : 'ic_clock_disable';

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-[0.8rem] px-4 py-3',
        active ? 'bg-main0 text-main500' : 'hover:bg-gray0',
        'transition-colors',
        className
      )}
    >
      {/* 장식용 아이콘은 스크린리더 숨김 */}
      <Icon name={currentIcon} aria-hidden className="size-5 shrink-0" />
      <span className="sub2-b flex-1">{label}</span>
      {trailing}
    </div>
  );
}
