import { cva } from 'class-variance-authority';
import TimePicker from '../timePicker/TimePicker';
import { AlarmsType } from '@constants/alarms';
import { useState } from 'react';
import { normalizeTime } from '@pages/onBoarding/utils/formatRemindTime';
interface AlarmBoxProps {
  select: 1 | 2 | 3;
  isDisabled: boolean;
  onClick?: () => void;
}

const boxStyle = cva(
  'flex h-[22.4rem] w-[18rem] flex-col items-center rounded-[1.2rem] px-[3.9rem] pb-[2.6rem] pt-[3.6rem] cursor-pointer transition',
  {
    variants: {
      disabled: {
        true: 'border-main400 bg-main0 border',
        false: 'bg-white border border-transparent hover:border-main300',
      },
    },
    defaultVariants: { disabled: false },
  }
);

const AlarmBox = ({ select, isDisabled, onClick }: AlarmBoxProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const getTimePicker = ({ hour, minute, meridiem }: { hour: string; minute: string; meridiem: string }) => {
        const formatted = `${meridiem} ${hour}:${minute}`;
        AlarmsType[2].time = formatted;
        setShowPicker(false);
        // 이거 나중에 api 연결때 쓸려고 표시한거.. 그떄 지우겠듬여 console.log('저장된 사용자 알람:', AlarmsType[2].time);
  }
  return (
    <div
      className={boxStyle({ disabled: isDisabled })}
      onClick={() => {
        if (select === 3 && isDisabled) {
          setShowPicker((prev) => !prev);
        }
        onClick?.();
      }}
    >
      <img src={AlarmsType[select - 1].img} alt="chippi" />
      <p
        className={`sub3-sb ${
          isDisabled ? 'text-main500' : 'text-font-black-1'
        }`}
      >
        {AlarmsType[select - 1].title}
      </p>

      {select <= 2 && (
        <p className="caption2-m text-font-gray-3">
          {AlarmsType[select - 1].time}
        </p>
      )}

      {select === 3 && isDisabled && (
        <>
          {AlarmsType[2].time && (
            <p className="caption2-m text-font-gray-3">{normalizeTime(AlarmsType[2].time)}</p>
          )}

          {showPicker && (
            <TimePicker
              onSave={getTimePicker}
              onCancel={() => {
                AlarmsType[2].time = '';
              }}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AlarmBox;
