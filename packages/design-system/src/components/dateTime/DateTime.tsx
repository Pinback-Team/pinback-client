import { useRef, useState, type ChangeEvent } from 'react';
import { cva } from 'class-variance-authority';
import {
  digitsOnly,
  formatDate,
  formatTime12,
  mapCaretByDigitsPos,
} from './utils/DateTimeUtils';

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
        disabled: 'text-font-ltgray-4 cursor-not-allowed',
        error: 'text-error',
      },
    },
    defaultVariants: { state: 'default' },
  }
);

export default function DateTime({ type, value = '', state }: DateTimeProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isDisabled = state === 'disabled';
  const nextCaretRef = useRef<number | null>(null);
  const [timeDigits, setTimeDigits] = useState(() =>
    digitsOnly(value).slice(0, 4)
  );
  const [input, setInput] = useState(() =>
    type === 'date' ? formatDate(digitsOnly(value)) : formatTime12(timeDigits)
  );

  // [시간 타입] 입력 단계에서의 자잘한 이벤트 처리 ! 얘는 중간 중간 계산해줘야해서 beforeInput에서 처리
  const handleBeforeInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (type !== 'time') return;

    const ne = e.nativeEvent as InputEvent;
    const inputType = ne.inputType || '';
    const data = (ne as InputEvent).data;
    // 입력 타입이 insert일때
    if (inputType.startsWith('insert') && data) {
      const add = data.replace(/\D/g, '');
      if (!add) {
        e.preventDefault();
        return;
      }
      if (timeDigits.length >= 4) {
        // 타입이 4글자 넘어가면 더이상 받지 않기
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

    // 백스페이스 인풋일 때, 포맷팅 조절
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
    // paste 이벤트일 때
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
  // [날짜 타입] input value에 반영된 후에서의 이벤트 처리 : 왜 날짜/시간 타입에 따라 나눴는지 PR 참고!!
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
        placeholder={type === 'date' ? 'YYYY.MM.DD' : 'HH:MM'}
        inputMode="numeric"
        disabled={isDisabled}
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
