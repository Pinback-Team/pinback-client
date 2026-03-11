import { cn } from '@pinback/design-system/utils';

export interface OptionsMenuButtonProps {
  ref?: React.Ref<HTMLDivElement>;
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
}

const ITEM_STYLE =
  'body4-r text-font-black-1 h-[3.6rem] w-full ' +
  'flex items-center px-[0.8rem] ' +
  'hover:bg-gray100 focus-visible:bg-gray100 active:bg-gray200 ' +
  'outline-none transition-colors';

export default function OptionsMenuButton({
  ref,
  onEdit,
  onDelete,
  className,
}: OptionsMenuButtonProps) {
  return (
    <div
      ref={ref}
      role="menu"
      aria-label="옵션 메뉴"
      className={cn(
        'bg-white-bg common-shadow rounded-[0.4rem] px-0 py-[1.2rem]',
        'flex h-[9.6rem] w-[12.4rem] flex-col items-center justify-center',
        className
      )}
    >
      <button type="button" onClick={onEdit} className={ITEM_STYLE}>
        수정하기
      </button>
      <button type="button" onClick={onDelete} className={ITEM_STYLE}>
        삭제하기
      </button>
    </div>
  );
}
