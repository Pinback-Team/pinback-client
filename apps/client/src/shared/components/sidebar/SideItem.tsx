import { Icon, type IconName } from '@pinback/design-system/icons';
import { cn } from '@pinback/design-system/utils';

export type IconToken = 'clock' | 'bookmark';

const ICON_MAP: Record<IconToken, { on: IconName; off: IconName }> = {
  clock: { on: 'ic_clock_active', off: 'ic_clock_disable' },
  bookmark: { on: 'ic_bookmark_active', off: 'ic_bookmark_disable' },
} as const;

interface SideItemProps {
  label: string;
  icon: IconToken;
  active?: boolean;
  className?: string;
  trailing?: boolean;
  open?: boolean;
  onTrailingClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClick: () => void;
}

export default function SideItem({
  label,
  icon,
  active = false,
  className,
  trailing,
  open,
  onTrailingClick,
  onClick,
}: SideItemProps) {
  const name = active ? ICON_MAP[icon].on : ICON_MAP[icon].off;

  return (
    <div
      className={cn(
        'flex h-[4.4rem] items-center gap-[0.8rem] rounded-[0.4rem] px-[0.8rem] py-[1.2rem]',
        'transition-colors',
        active ? 'bg-main0 text-main600' : 'bg-white-bg text-font-gray-2',
        className
      )}
      onClick={onClick}
    >
      <Icon name={name} aria-hidden className="h-[2rem] w-[2rem]" />
      <span className="sub5-sb flex-1">{label}</span>

      {trailing && (
        <button
          type="button"
          className="rounded-[0.4rem] p-1 focus-visible:ring-2"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onTrailingClick?.(e);
          }}
        >
          <Icon
            name="ic_arrow_down_active"
            aria-hidden
            className={cn(
              'h-[2rem] w-[2rem] transition-transform',
              open && 'rotate-180'
            )}
          />
        </button>
      )}
    </div>
  );
}
