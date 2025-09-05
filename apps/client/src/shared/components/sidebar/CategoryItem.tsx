// CategoryItem.tsx
import { Icon } from '@pinback/design-system/icons';
import { cn } from '@pinback/design-system/utils';

interface CategoryItemProps {
  id: number;
  label: string;
  active: boolean;
  className?: string;
  onClick: (id: number) => void;
  onOptionsClick?: (id: number, anchorEl: HTMLElement) => void; // ⬅️ 추가
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
      {/* 행 클릭 */}
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

      {/* 옵션(케밥) 버튼 – 행 클릭과 이벤트 분리 */}
      <button
        type="button"
        aria-haspopup="menu"
        aria-label="카테고리 옵션"
        className="ml-2"
        onClick={(e) => {
          e.preventDefault(); // ⬅️ 링크/포커스 등 기본동작 차단
          e.stopPropagation(); // ⬅️ 부모 클릭 핸들러로 버블링 차단
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
