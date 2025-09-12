export const validateDate = (value: string): string => {
  const regex = /^(\d{4})\.(\d{2})\.(\d{2})$/;
  const match = value.match(regex);

  if (!match) return '유효한 날짜를 작성하세요';

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);

  if (month < 1 || month > 12) return '유효한 날짜를 작성하세요';

  const testDate = new Date(year, month - 1, day);
  if (
    testDate.getFullYear() !== year ||
    testDate.getMonth() !== month - 1 ||
    testDate.getDate() !== day
  ) {
    return '유효한 날짜를 작성하세요';
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (testDate < today) return '현재 시점 이후 날짜로 작성하세요';

  return '';
};

// 시간 유효성 검사
export const validateTime = (value: string | undefined): string => {
  if (!value) return '시간을 입력하세요';

  const clean = value.replace(/[^0-9:]/g, '');
  const regex = /^(\d{1,2}):(\d{1,2})$/;
  const match = clean.match(regex);

  if (!match) return '유효한 시간을 작성하세요';
  const hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);

  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    return '유효한 시간을 작성하세요';
  }

  return '';
};
