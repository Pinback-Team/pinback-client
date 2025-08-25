import { useRef, useState, type ChangeEvent } from 'react';
import { cva } from 'class-variance-authority';

interface DateTimeProps {
  state: 'default' | 'disabled' | 'error';
  type: 'date' | 'time';
  value?: string;
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

const dateTimeLabelStyles = cva(`caption1-sb`, {
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
  `body3-r m-0 w-[7rem] overflow-hidden outline-none`,
  {
    variants: {
      state: {
        default: 'text-font-gray-3',
        disabled: 'text-font-ltgray-4',
        error: 'text-error',
      },
    },
    defaultVariants: { state: 'default' },
  }
);

export default function DateTime({ type, value = '', state }: DateTimeProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const nextCaretRef = useRef<number | null>(null);
  const [timeDigits, setTimeDigits] = useState(() =>
    digitsOnly(value).slice(0, 4)
  );
  const [input, setInput] = useState(() =>
    type === 'date' ? formatDate(digitsOnly(value)) : formatTime12(timeDigits)
  );
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

  function formatTime12(digits: string) {
    const v = digits.slice(0, 4);
    if (v.length === 0) return '';

    const hhDigits = v.slice(0, 2);
    const mmDigits = v.slice(2, 4);
    const hour24 = parseInt(hhDigits || '0', 10);
    const ampm = hour24 >= 12 ? '오후' : '오전';

    let h12: number;
    if (hhDigits.length < 2) {
      h12 = parseInt(hhDigits || '0', 10) % 12;
      if (h12 === 0) h12 = 12;
    } else {
      h12 = hour24 % 12;
      if (h12 === 0) h12 = 12;
    }
    const displayHour = String(h12).padStart(2, '0');

    let out = `${ampm} ${displayHour}`;
    if (mmDigits.length > 0) out += `:${mmDigits}`;
    return out;
  }

  function mapCaretByDigitsPos(digitsPos: number, kind: 'date' | 'time') {
    if (kind === 'date') {
      if (digitsPos <= 4) return digitsPos;
      if (digitsPos <= 6) return digitsPos + 1;
      return Math.min(digitsPos + 2, 10);
    } else {
      const PREFIX = 3;
      if (digitsPos === 0) return PREFIX;
      if (digitsPos <= 2) return PREFIX + 2;
      return Math.min(PREFIX + 3 + (digitsPos - 2), PREFIX + 5);
    }
  }

  const handleBeforeInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (type !== 'time') return;

    const ne = e.nativeEvent as InputEvent;
    const inputType = ne.inputType || '';
    const data = (ne as InputEvent).data;

    if (inputType.startsWith('insert') && data) {
      const add = data.replace(/\D/g, '');
      if (!add) {
        e.preventDefault();
        return;
      }
      if (timeDigits.length >= 4) {
        e.preventDefault();
        return;
      }
      const next = (timeDigits + add).slice(0, 4);
      setTimeDigits(next);
      setInput(formatTime12(next));
      nextCaretRef.current = mapCaretByDigitsPos(next.length, 'time');
      e.preventDefault();
      return;
    }

    // (b) 백스페이스
    if (inputType === 'deleteContentBackward') {
      if (timeDigits.length === 0) {
        e.preventDefault();
        return;
      }
      const next = timeDigits.slice(0, -1);
      setTimeDigits(next);
      setInput(formatTime12(next));
      nextCaretRef.current = mapCaretByDigitsPos(next.length, 'time');
      e.preventDefault();
      return;
    }

    const pasted = digitsOnly((ne as InputEvent).data ?? '');
    if (pasted) {
      const next = (timeDigits + pasted).slice(0, 4);
      setTimeDigits(next);
      setInput(formatTime12(next));
      nextCaretRef.current = mapCaretByDigitsPos(next.length, 'time');
      e.preventDefault();
    } else {
      e.preventDefault();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === 'time') return;
    const raw = e.target.value;
    const only = digitsOnly(raw).slice(0, 8);
    const formatted = formatDate(only);
    setInput(formatted);
    const caret = e.target.selectionStart ?? raw.length;
    const leftDigitsCount = raw.slice(0, caret).replace(/\D/g, '').length;
    nextCaretRef.current = mapCaretByDigitsPos(leftDigitsCount, 'date');
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type !== 'time') return;
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Backspace') {
      if (timeDigits.length > 0) {
        const next = timeDigits.slice(0, -1);
        setTimeDigits(next);
        setInput(formatTime12(next));
        nextCaretRef.current = mapCaretByDigitsPos(next.length, 'time');
      }
      e.preventDefault();
    }

    if (e.key === 'Delete') {
      if (timeDigits.length > 0) {
        const next = timeDigits.slice(0, -1);
        setTimeDigits(next);
        setInput(formatTime12(next));
        nextCaretRef.current = mapCaretByDigitsPos(next.length, 'time');
      }
      e.preventDefault();
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
        value={input}
        onBeforeInput={handleBeforeInput}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        placeholder={type === 'date' ? 'YYYY.MM.DD' : '오후 HH:MM'}
        inputMode="numeric"
        maxLength={type === 'date' ? 10 : 8}
        pattern={
          type === 'date'
            ? '\\d{4}\\.\\d{2}\\.\\d{2}'
            : '(오전|오후)\\s\\d{2}:\\d{2}'
        }
        aria-label={type === 'date' ? '날짜 입력' : '시간 입력'}
      />
    </div>
  );
}
