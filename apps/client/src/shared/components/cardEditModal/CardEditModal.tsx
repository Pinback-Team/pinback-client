import { Icon } from '@pinback/design-system/icons';
import { Button, InfoBox, Switch, Textarea } from '@pinback/design-system/ui';
import { cn } from '@pinback/design-system/utils';
import { HTMLAttributes } from 'react';

export interface CardEditModalProps extends HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

export default function CardEditModal({
  className,
  onClose,
  ...rest
}: CardEditModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className={cn(
        'w-[31.2rem] rounded-[1.2rem] bg-white p-[2.4rem] shadow-xl',
        'flex flex-col gap-[1.6rem]',
        className
      )}
      {...rest}
    >
      <header className="flex items-center justify-between">
        <Icon name="ic_close" size={20} />
        {/* 머지후 로고로 변경 예정 */}

        <button
          type="button"
          aria-label="닫기"
          onClick={onClose}
          className="rounded-[0.6rem] p-[0.4rem] hover:bg-gray-100"
        >
          <Icon name="ic_close" size={20} />
        </button>
      </header>

      <InfoBox title="집에서 할 수 있는 간단한 요..." source="네이버 블로그" />

      <section className="flex flex-col gap-[0.8rem]">
        <p className="caption1-sb text-font-black-1">카테고리</p>

        {/* TODO: 실제 Dropdown 컴포넌트로 교체 */}
        <button
          type="button"
          className={cn(
            'flex h-[4.8rem] w-full items-center justify-between rounded-[0.8rem] border px-[1.2rem]',
            'hover:border-main500 border-gray-200 transition-colors'
          )}
        >
          <span className="body4-r text-font-black-1">오뚜기</span>
          <Icon name="ic_arrow_down_disable" width={16} height={16} />
        </button>
      </section>

      <section className="flex flex-col gap-[0.8rem]">
        <p className="caption1-sb text-font-black-1">메모</p>
        <Textarea
          placeholder="나중에 내가 꺼내줄 수 있게 살짝 적어줘!"
          maxLength={500}
          className="h-[12rem]"
        />
      </section>

      <section className="flex flex-col gap-[1.2rem]">
        <div className="flex items-center justify-between">
          <p className="caption1-sb text-font-black-1">리마인드</p>
          <Switch defaultChecked />
        </div>

        {/* TODO: 날짜/시간 피커로 교체 */}
        <div className="grid grid-cols-2 gap-[1.2rem]">
          <div className="flex flex-col gap-[0.6rem]">
            <label className="body4-r text-font-black-2">날짜</label>
            <div className="flex h-[4.8rem] items-center rounded-[0.8rem] border border-gray-200 px-[1.2rem]">
              <input
                type="text"
                inputMode="numeric"
                defaultValue="2025.08.13"
                className="body4-r text-font-black-1 placeholder:text-font-gray-3 w-full bg-transparent outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[0.6rem]">
            <label className="body4-r text-font-black-2">시간</label>
            <div className="flex h-[4.8rem] items-center rounded-[0.8rem] border border-gray-200 px-[1.2rem]">
              <input
                type="text"
                defaultValue="오전 08:00"
                className="body4-r text-font-black-1 placeholder:text-font-gray-3 w-full bg-transparent outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      <Button>저장하기</Button>
    </div>
  );
}
