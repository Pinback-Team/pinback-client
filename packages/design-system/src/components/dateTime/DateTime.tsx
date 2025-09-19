import {  useState, useEffect } from 'react';
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
);export default function DateTime({
  type,
  value,
  state,
  onChange,
}: DateTimeProps) {
  const isDisabled = state === 'disabled';
  const [rawDigits, setRawDigits] = useState(() => digitsOnly(value ?? ''));

  useEffect(() => {
  setRawDigits(digitsOnly(value ?? ''));
}, [value]);

  const formatted =
    type === 'date'
      ? formatDate(rawDigits.slice(0, 8))
      : formatTime12(rawDigits.slice(0, 4));

  const handleBeforeInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e as unknown as InputEvent;

    if (!/[0-9]/.test(input.data ?? '')) {
      e.preventDefault();
      return;
    }

    setRawDigits((prev) => {
      const next = (prev + input.data!).slice(0, type === 'date' ? 8 : 4);
      onChange?.(next); 
      return next;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      setRawDigits((prev) => {
        const next = prev.slice(0, -1);
        onChange?.(next);
        return next;
      });
    }
  };

  return (
    <div className={dateTimeBoxStyles({ state })}>
      <span className={dateTimeLabelStyles({ state })}>
        {type === 'date' ? '날짜' : '시간'}
      </span>
      <input
        type="text"
        className={dateTimeTxtStyles({ state })}
        value={formatted}
        onBeforeInput={handleBeforeInput}
        onKeyDown={handleKeyDown}
        placeholder={type === 'date' ? 'YYYY.MM.DD' : 'HH:MM'}
        inputMode="numeric"
        disabled={isDisabled}
      />
    </div>
  );
}
