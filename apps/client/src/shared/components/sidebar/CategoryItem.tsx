import { Icon } from '@pinback/design-system/icons';
import { cn } from '@pinback/design-system/utils';

interface CategoryItemProps {
  id: number;
  label: string;
  active: boolean;
  className?: string;
  onClick: (id: number) => void;
  onOptionsClick?: (id: number, anchorEl: HTMLElement) => void;
}

export default function CategoryItem({
  id,
  label,
  active = false,
  className,
  onClick,
  onOptionsClick,
}: CategoryItemProps) {
  return (
    <div
      className={cn(
        'flex h-[3.6rem] w-full items-center justify-between rounded-[0.4rem] px-[1.2rem]',
        active ? 'bg-main0' : 'bg-white-bg',
        'transition-colors',
        className
      )}
    >
      <button
        type="button"
        aria-pressed={active}
        onClick={() => onClick(id)}
        className={cn(
          'body4-r flex-1 text-left',
          active ? 'text-main600' : 'text-font-gray-2'
        )}
      >
        {label}
      </button>

      <button
        type="button"
        aria-haspopup="menu"
        aria-label="카테고리 옵션"
        className="ml-2"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onOptionsClick?.(id, e.currentTarget);
        }}
      >
        <Icon
          name={active ? 'ic_details_category' : 'ic_details_disable'}
          aria-hidden
          className="h-[1.8rem] w-[1.8rem]"
        />
      </button>
    </div>
  );
}
