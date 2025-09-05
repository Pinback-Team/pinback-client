import { Icon } from '@pinback/design-system/icons';
import { cn } from '@pinback/design-system/utils';

interface CategoryItemProps {
  label: string;
  active: boolean;
  className?: string;
  onClick: () => void;
}
//TODO: onClick 이벤트 추가
//TODO: 버튼 클릭시 활성화 로직 필요
//TODO: 인덱스 번호

export default function CategoryItem({
  label,
  active = false,
  className,
  onClick,
}: CategoryItemProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={active}
      data-state={active ? 'active' : 'default'}
      className={cn(
        'flex h-[3.6rem] w-full rounded-[0.4rem] p-[0.8rem]',
        'items-center justify-between transition-colors',
        active ? 'bg-main0' : 'bg-white-bg',
        className
      )}
    >
      <p
        className={cn('body4-r', active ? 'text-main600' : 'text-font-gray-2')}
      >
        {label}
      </p>
      <button type="button" onClick={onClick}>
        <Icon
          name={active ? 'ic_details_category' : 'ic_details_disable'}
          aria-hidden
          className={cn('h-[1.8rem] w-[1.8rem]')}
        />
      </button>
    </div>
  );
}
