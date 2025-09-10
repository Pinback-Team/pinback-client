import { Icon } from '@pinback/design-system/icons';
import {
  AutoDismissToast,
  Button,
  DateTime,
  Dropdown,
  InfoBox,
  PopupContainer,
  Switch,
  Textarea,
  Toast,
  validateDate,
  validateTime,
} from '@pinback/design-system/ui';
import { cn } from '@pinback/design-system/utils';
import { useState } from 'react';

export interface CardEditModalProps {
  onClose: () => void;
}

export default function CardEditModal({ onClose }: CardEditModalProps) {
  const [remindOn, setRemindOn] = useState<boolean>(true);
  const [memo, setMemo] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [date, setDate] = useState('2025.10.10');
  const [time, setTime] = useState('19:00');
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');

  const [toastIsOpen, setToastIsOpen] = useState(false);

  const handleDateChange = (value: string) => {
    setDate(value);
    setDateError(validateDate(value));
  };

  const handleTimeChange = (value: string) => {
    setTime(value);
    setTimeError(validateTime(value));
  };

  const handleSwitchChange = (checked: boolean) => {
    setRemindOn(checked);
  };

  return (
    <div className="flex flex-col">
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'w-[31.2rem] rounded-[1.2rem] bg-white px-[3.2rem] py-[2.4rem] shadow-xl',
          'flex flex-col gap-[1.6rem]'
        )}
      >
        {isPopupOpen && (
          <PopupContainer
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            type="input"
            title="카테고리 추가하기"
            left="취소"
            right="확인"
            placeholder="카테고리 제목을 입력해주세요"
            onLeftClick={() => setIsPopupOpen(false)}
            onRightClick={() => setIsPopupOpen(false)}
          />
        )}
        <header className="flex items-center justify-between">
          <Icon name="ic_close" size={20} />
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="rounded-[0.6rem] p-[0.4rem] hover:bg-gray-100"
          >
            <Icon name="ic_close" size={20} onClick={onClose} />
          </button>
        </header>

        <InfoBox
          title="집에서 할 수 있는 간단한 요..."
          source="네이버 블로그"
        />

        <section className="flex flex-col gap-[0.8rem]">
          <p className="caption1-sb text-font-black-1">카테고리</p>
          <Dropdown
            options={['옵션1', '옵션2']}
            selectedValue={selected}
            onChange={(value: string | null) => setSelected(value)}
            placeholder="선택해주세요"
            onAddItem={() => setIsPopupOpen(true)}
            addItemLabel="추가하기"
          />
        </section>

        <section className="flex flex-col gap-[0.8rem]">
          <p className="caption1-sb text-font-black-1">메모</p>
          <Textarea
            placeholder="나중에 내가 꺼내줄 수 있게 살짝 적어줘!"
            maxLength={500}
            className="h-[12rem]"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </section>

        <section className="flex flex-col gap-[1.2rem]">
          <div className="flex items-center justify-between">
            <p className="caption1-sb text-font-black-1">리마인드</p>
            <Switch checked={remindOn} onCheckedChange={handleSwitchChange} />
          </div>

          <div className="flex justify-between gap-[0.8rem]">
            <DateTime
              type="date"
              state={dateError ? 'error' : remindOn ? 'default' : 'disabled'}
              value={date}
              onChange={handleDateChange}
            />
            <DateTime
              type="time"
              state={timeError ? 'error' : remindOn ? 'default' : 'disabled'}
              value={time}
              onChange={handleTimeChange}
            />
          </div>

          {dateError && <p className="body3-r text-error">{dateError}</p>}
          {timeError && <p className="body3-r text-error">{timeError}</p>}
        </section>
        {/* TODO: onClick 추후  저장 api 연결후 실패/성공 연결 */}
        <Button onClick={() => setToastIsOpen(true)}>저장하기</Button>
      </div>
      {toastIsOpen && (
        <div className="flex justify-center pt-[1.6rem]">
          <AutoDismissToast
            duration={1000}
            fadeMs={1000}
            onClose={() => setToastIsOpen(false)}
          >
            <Toast text={`저장에 실패했어요.\n다시 시도해주세요`} />
          </AutoDismissToast>
        </div>
      )}
    </div>
  );
}
