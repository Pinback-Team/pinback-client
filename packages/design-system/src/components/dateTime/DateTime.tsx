import { useRef, useState, useLayoutEffect, type ChangeEvent } from 'react';
import { cva } from 'class-variance-authority';
interface DateTimeProps {
  state: 'default' | 'disabled' | 'error';
  type: 'date' | 'time';
  value?: string; // 초기값(optional)
}
const dateTimeBoxStyles = cva(
  `flex w-[12rem] items-center gap-[0.8rem] rounded-[0.4rem] border px-[0.8rem] py-[1.2rem]`,
  {
    variants: {
      state: {
        default: 'border-gray200 bg-white-bg ',
        disabled: 'border-gray200 bg-gray200',
        error: 'border-error bg-white-bg ',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);
const dateTimeLabelStyles = cva(`caption1-sb`, {
  variants: {
    state: {
      default: 'text-font-black-1',
      disabled: 'text-font-ltgray-4',
      error: 'text-font-black-1',
    },
  },
  defaultVariants: {
    state: 'default',
  },
});
const dateTimeTxtStyles = cva(
  `body3-r m-0 w-[7rem] overflow-hidden outline-none`,
  {
    variants: {
      state: {
        default: 'text-font-gray-3',
        disabled: 'text-font-ltgray-4',
        error: 'text-error',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

export default function DateTime({ type, value = '' }: DateTimeProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState(() =>
    type === 'date'
      ? formatDate(digitsOnly(value))
      : formatTime(digitsOnly(value))
  );
  const nextCaretRef = useRef<number | null>(null);

  function digitsOnly(s: string) {
    return s.replace(/\D/g, '');
  }

  function formatDate(d: string) {
    const v = d.slice(0, 8);
    const y = v.slice(0, 4);
    const m = v.slice(4, 6);
    const dd = v.slice(6, 8);
    let out = y;
    if (m) out += '.' + m;
    if (dd) out += '.' + dd;
    return out;
  }

  function formatTime(d: string) {
    const v = d.slice(0, 4);
    const hh = v.slice(0, 2);
    const mm = v.slice(2, 4);
    let out = hh;
    if (mm) out += ':' + mm;
    return out;
  }

  function mapCaretByDigitsPos(digitsPos: number, kind: 'date' | 'time') {
    if (kind === 'date') {
      if (digitsPos <= 4) return digitsPos;
      if (digitsPos <= 6) return digitsPos + 1;
      return Math.min(digitsPos + 2, 10);
    } else {
      if (digitsPos <= 2) return digitsPos;
      return Math.min(digitsPos + 1, 5);
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const caret = e.target.selectionStart ?? raw.length;

    const leftDigitsCount = raw.slice(0, caret).replace(/\D/g, '').length;

    const only = digitsOnly(raw);
    const formatted = type === 'date' ? formatDate(only) : formatTime(only);

    nextCaretRef.current = mapCaretByDigitsPos(leftDigitsCount, type);
    setInput(formatted);
  };

  useLayoutEffect(() => {
    if (nextCaretRef.current != null && inputRef.current) {
      const pos = nextCaretRef.current;
      inputRef.current.setSelectionRange(pos, pos);
      nextCaretRef.current = null;
    }
  }, [input]);

  return (
    <div className={dateTimeBoxStyles({ state: 'default' })}>
      <span className={dateTimeLabelStyles({ state: 'default' })}>
        {type === 'date' ? '날짜' : '시간'}
      </span>
      <input
        ref={inputRef}
        type="text"
        className={dateTimeTxtStyles({ state: 'default' })}
        value={input}
        onChange={handleChange}
        placeholder={type === 'date' ? 'YYYY.MM.DD' : 'HH:MM'}
        inputMode="numeric"
        maxLength={type === 'date' ? 10 : 5}
        pattern={type === 'date' ? '\\d{4}\\.\\d{2}\\.\\d{2}' : '\\d{2}:\\d{2}'}
        aria-label={type === 'date' ? '날짜 입력' : '시간 입력'}
      />
    </div>
  );
}
