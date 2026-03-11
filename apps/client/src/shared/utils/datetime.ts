// YYYY-MM-DD → YYYY.MM.DD
export const updateDate = (date: string) => {
  if (!date) return '';
  return date.replace(/-/g, '.');
};

// HH:mm:ss → HH:mm
export const updateTime = (time: string) => {
  if (!time) return '';
  return time.slice(0, 5);
};

export const to24Hour = (time: string) => {
  const match = time.match(/(오전|오후)\s(\d{1,2}):(\d{2})/);
  if (!match) return time;

  const [, period, hourStr, minute] = match;
  let hour = parseInt(hourStr, 10);

  if (period === '오전' && hour === 12) {
    hour = 0;
  } else if (period === '오후' && hour !== 12) {
    hour += 12;
  }

  return `${hour.toString().padStart(2, '0')}:${minute}`;
};

export const combineDateTime = (date: string, time: string) => {
  if (!date || !time) return null;

  // date가 YYYYMMDD 형태라면 가공 필요
  let formattedDate = date;
  if (/^\d{8}$/.test(date)) {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);
    formattedDate = `${year}-${month}-${day}`;
  } else {
    formattedDate = date.replace(/\./g, '-'); // YYYY.MM.DD → YYYY-MM-DD
  }

  // time이 HHmm 형태라면 HH:mm으로 변환
  let normalizedTime = time;
  if (/^\d{4}$/.test(time)) {
    normalizedTime = `${time.slice(0, 2)}:${time.slice(2, 4)}`;
  }

  // 24시간 포맷 변환 함수가 있다면 적용
  const to24 = to24Hour ? to24Hour(normalizedTime) : normalizedTime;
  const formattedTime = to24.length === 5 ? `${to24}:00` : to24;

  return `${formattedDate}T${formattedTime}`;
};
