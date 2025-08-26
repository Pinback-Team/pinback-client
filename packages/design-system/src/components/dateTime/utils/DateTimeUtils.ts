// 숫자만 추출
export function digitsOnly(s: string) {
  return s.replace(/\D/g, '');
}

// 날짜 포맷팅: YYYY.MM.DD
export function formatDate(d: string) {
  const v = d.slice(0, 8);
  const y = v.slice(0, 4);
  const m = v.slice(4, 6);
  const dd = v.slice(6, 8);
  let out = y;
  if (m) out += '.' + m;
  if (dd) out += '.' + dd;
  return out;
}

// 시간 포맷팅: 오전/오후 HH:MM (12시간 기준)
export function formatTime12(digits: string) {
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

// caret 위치 매핑
export function mapCaretByDigitsPos(digitsPos: number, kind: 'date' | 'time') {
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
