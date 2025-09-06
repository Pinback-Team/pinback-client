import {
  Button,
  WheelPicker,
  WheelPickerOption,
  WheelPickerWrapper,
} from '@pinback/design-system/ui';
import { MouseEventHandler, useState } from 'react';

const createArray = (length: number, add = 0): WheelPickerOption[] =>
  Array.from({ length }, (_, i) => {
    const value = i + add;
    return {
      label: value.toString().padStart(2, '0'),
      value: value.toString(),
    };
  });

const hourOptions = createArray(12, 1);
const minuteOptions = createArray(60);
const meridiemOptions: WheelPickerOption[] = [
  { label: 'AM', value: 'AM' },
  { label: 'PM', value: 'PM' },
];

interface TimePickerProps {
  onSave: (time: { hour: string; minute: string; meridiem: string }) => void;
  onCancel: () => void;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const TimePicker = ({ onSave, onCancel, onClick }: TimePickerProps) => {
  const [selectedHour, setSelectedHour] = useState(hourOptions[0].value);
  const [selectedMinute, setSelectedMinute] = useState(minuteOptions[0].value);
  const [selectedMeridiem, setSelectedMeridiem] = useState(
    meridiemOptions[0].value
  );

  return (
    <div
      onClick={onClick}
      className="common-shadow absolute -bottom-[180px] -right-[100px] z-10 flex w-[26rem] flex-col items-center rounded-[1.2rem] bg-white px-[1.6rem]"
    >
      <WheelPickerWrapper className="flex h-[16.8rem] !items-center py-[0.8rem]">
        <WheelPicker
          options={hourOptions}
          aria-label="시"
          infinite
          optionItemHeight={56}
          onValueChange={(value: string) => setSelectedHour(value)}
        />
        <p className="bod y2-m z-2 mx-[0.8rem] flex h-[5.6rem] items-center justify-center">
          :
        </p>
        <WheelPicker
          options={minuteOptions}
          aria-label="분"
          infinite
          optionItemHeight={56}
          onValueChange={(value: string) => setSelectedMinute(value)}
        />
        <div className="mx-[0.4rem]" />
        <WheelPicker
          options={meridiemOptions}
          aria-label="오전/오후"
          optionItemHeight={56}
          onValueChange={(value: string) => setSelectedMeridiem(value)}
        />
      </WheelPickerWrapper>
      <div className="flex w-full gap-[1.2rem] pb-[2.4rem] pt-[0.8rem]">
        <Button variant="secondary" onClick={onCancel}>
          취소
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            onSave({
              hour: selectedHour,
              minute: selectedMinute,
              meridiem: selectedMeridiem,
            })
          }
        >
          확인
        </Button>
      </div>
    </div>
  );
};

export default TimePicker;
