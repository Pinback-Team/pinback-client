import { useRef, useState, type ChangeEvent } from 'react';
import { cva } from 'class-variance-authority';
import {
  digitsOnly,
  formatDate,
  formatTime12,
} from './utils/FormatData';

interface DateTimeProps {
  state: 'default' | 'disabled' | 'error';
  type: 'date' | 'time';
  value?: string;
  onChange?: (value: string) => void;
}

const dateTimeBoxStyles = cva(
  `flex w-[12rem] items-center gap-[0.8rem] rounded-[0.4rem] border px-[0.8rem] py-[1.2rem]`,
  {
    variants: {
      state: {
        default: 'border-gray200 bg-white-bg',
        disabled: 'border-gray200 bg-gray200',
        error: 'border-error bg-white-bg',
      },
    },
    defaultVariants: { state: 'default' },
  }
);

const dateTimeLabelStyles = cva(`caption1-sb whitespace-nowrap`, {
  variants: {
    state: {
      default: 'text-font-black-1',
      disabled: 'text-font-ltgray-4',
      error: 'text-font-black-1',
    },
  },
  defaultVariants: { state: 'default' },
});

const dateTimeTxtStyles = cva(
  `body3-r m-0 w-[7.2rem] overflow-hidden outline-none`,
  {
    variants: {
      state: {
        default: 'text-font-gray-3',
        disabled: 'text-font-ltgray-4 cursor-not-allowed',
        error: 'text-error',
      },
    },
    defaultVariants: { state: 'default' },
  }
);

export default function DateTime({
  type,
  value = '',
  state,
  onChange,
}: DateTimeProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isDisabled = state === 'disabled';

  // rawDigits → 숫자만 관리
  const [rawDigits, setRawDigits] = useState(() => digitsOnly(value));

  // formatted → 보여줄 값
  const formatted = type === 'date'
    ? formatDate(rawDigits.slice(0, 8))
    : formatTime12(rawDigits.slice(0, 4));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = digitsOnly(e.target.value);
    setRawDigits(onlyDigits);
    // ❌ 여기서는 부모에 전달 안 함 → 단지 내부 표시만 업데이트
  };

  const handleBlur = () => {
    if (type === 'date') {
      onChange?.(formatDate(rawDigits.slice(0, 8)));
    } else {
      onChange?.(formatTime12(rawDigits.slice(0, 4)));
    }
  };

  return (
    <div className={dateTimeBoxStyles({ state })}>
      <span className={dateTimeLabelStyles({ state })}>
        {type === 'date' ? '날짜' : '시간'}
      </span>
      <input
        ref={inputRef}
        type="text"
        className={dateTimeTxtStyles({ state })}
        value={formatted}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={type === 'date' ? 'YYYY.MM.DD' : 'HH:MM'}
        inputMode="numeric"
        disabled={isDisabled}
        maxLength={type === 'date' ? 10 : 8}
      />
    </div>
  );
}