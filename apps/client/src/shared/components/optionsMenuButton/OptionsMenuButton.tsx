import { cn } from '@pinback/design-system/utils';

export default function OptionsMenuButton() {
  return (
    <div
      className={cn(
        'bg-white-bg h-[9.6rem] w-[12.4rem]',
        'flex items-center justify-center',
        'rounded-[0.4rem] px-0 py-[1.2rem]',
        'common-shadow'
      )}
    >
      <div
        className={cn(
          'text-font-black-1 body4-r h-[3.6rem] w-full',
          'flex items-center justify-center'
        )}
      >
        수정하기
      </div>
      <div
        className={cn(
          'text-font-black-1 body4-r h-[3.6rem] w-full',
          'flex items-center justify-center'
        )}
      >
        삭제하기
      </div>
    </div>
  );
}
