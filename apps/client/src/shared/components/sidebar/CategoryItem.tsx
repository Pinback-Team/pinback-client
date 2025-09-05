import { Icon } from '@pinback/design-system/icons';
import { cn } from '@pinback/design-system/utils';

interface CategoryItemProps {
  id: number;
  label: string;
  active: boolean;
  className?: string;
  onClick: (id: number) => void;
}

export default function CategoryItem({
  id,
  label,
  active = false,
  className,
  onClick,
}: CategoryItemProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onClick(id)}
      className={cn(
        'flex h-[3.6rem] w-full items-center justify-between rounded-[0.4rem] px-[1.2rem]',
        'transition-colors',
        active ? 'bg-main0' : 'bg-white-bg',
        className
      )}
    >
      <span
        className={cn('body4-r', active ? 'text-main600' : 'text-font-gray-2')}
      >
        {label}
      </span>

      <Icon
        name={active ? 'ic_details_category' : 'ic_details_disable'}
        aria-hidden
        className="h-[1.8rem] w-[1.8rem]"
      />
    </button>
  );
}
