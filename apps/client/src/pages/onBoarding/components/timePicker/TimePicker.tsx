import {
  Button,
  WheelPicker,
  WheelPickerOption,
  WheelPickerWrapper,
} from '@pinback/design-system/ui';
import { useState } from 'react';

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

const TimePicker = () => {
  const [selectedHour, setSelectedHour] = useState(hourOptions[0].value);
  const [selectedMinute, setSelectedMinute] = useState(minuteOptions[0].value);
  const [selectedMeridiem, setSelectedMeridiem] = useState(
    meridiemOptions[0].value
  );

  return (
    <div className="common-shadow flex w-[26rem] flex-col items-center px-[1.6rem]">
      <WheelPickerWrapper className="flex h-[16.8rem] !items-center py-[0.8rem]">
        <WheelPicker
          options={hourOptions}
          infinite
          optionItemHeight={56}
          onValueChange={(value: string) => setSelectedHour(value)}
        />
        <p className="body2-m z-2 mx-[0.8rem] flex h-[5.6rem] items-center justify-center">
          :
        </p>
        <WheelPicker
          options={minuteOptions}
          infinite
          optionItemHeight={56}
          onValueChange={(value: string) => setSelectedMinute(value)}
        />
        <div className="mx-[0.4rem]" />
        <WheelPicker
          options={meridiemOptions}
          optionItemHeight={56}
          onValueChange={(value: string) => setSelectedMeridiem(value)}
        />
      </WheelPickerWrapper>
      <div className="flex w-full gap-[1.2rem] pb-[2.4rem] pt-[0.8rem]">
        <Button variant="secondary">취소</Button>
        <Button variant="primary">확인</Button>
      </div>
    </div>
  );
};

export default TimePicker;
