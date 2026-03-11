import { Icon } from '@pinback/design-system/icons';
import { cn } from '@pinback/design-system/utils';

interface CreateItemProps {
  onClick: () => void;
}

export default function CreateItem({ onClick }: CreateItemProps) {
  return (
    <button
      type="button"
      className={cn(
        'bg-white-bg flex h-[3.6rem] w-full gap-[0.8rem] rounded-[0.4rem] p-[0.8rem]',
        'items-center transition-colors'
      )}
      onClick={onClick}
    >
      <Icon
        name={'ic_plus'}
        aria-hidden
        className={cn('h-[1.6rem] w-[1.6rem]')}
      />
      <p className={'body4-r text-main500'}>카테고리 추가</p>
    </button>
  );
}
