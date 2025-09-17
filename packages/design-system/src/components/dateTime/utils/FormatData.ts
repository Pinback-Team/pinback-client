// 숫자만 추출
export function digitsOnly(s: string) {
  return s.replace(/\D/g, '');
}

// 날짜 포맷팅: YYYY.MM.DD
export function formatDate(d: string) {
  const value = d.slice(0, 8);
  const year = value.slice(0, 4);
  const month = value.slice(4, 6);
  const dd = value.slice(6, 8);
  let out = year;
  if (month) out += '.' + month;
  if (dd) out += '.' + dd;
  return out;
}

 export function formatTime12(digits: string) {
  // 최대 4자리까지만 허용 (HHMM)
  const clean = digits.slice(0, 4);

  const hhDigits = clean.slice(0, 2); // 시
  const mmDigits = clean.slice(2, 4); // 분

  // 아직 시 입력이 다 안 끝났을 경우
  if (hhDigits.length === 0) return '';
  if (hhDigits.length === 1 && !mmDigits) {
    // 한 자리만 있을 때는 그대로 보여줌 (ex: "2")
    return hhDigits;
  }

  let hour24 = parseInt(hhDigits, 10);
  if (isNaN(hour24)) hour24 = 0;
  if (hour24 > 23) hour24 = 23; // clamp

  const ampm = hour24 >= 12 ? '오후' : '오전';

  let h12 = hour24 % 12;
  if (h12 === 0) h12 = 12;
  const displayHour = String(h12).padStart(2, '0');

  let out = `${ampm} ${displayHour}`;
  if (mmDigits.length > 0) out += `:${mmDigits.padEnd(2, '')}`;
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
