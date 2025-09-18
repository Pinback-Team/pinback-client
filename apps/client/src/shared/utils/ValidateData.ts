export const validateDate = (digits: string): string => {
  if (!digits || digits.length !== 8) {
    return '날짜 8자리를 입력하세요 (예: 20250112)';
  }

  const year = parseInt(digits.slice(0, 4), 10);
  const month = parseInt(digits.slice(4, 6), 10);
  const day = parseInt(digits.slice(6, 8), 10);

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
  if (testDate < today) {
    return '현재 시점 이후 날짜로 작성하세요';
  }

  return '';
};

export const validateTime = (digits: string): string => {
  if (!digits || digits.length !== 4) {
    return 'HH:MM 형식으로 입력하세요 (예: 2312)';
  }

  const hour = parseInt(digits.slice(0, 2), 10);
  const minute = parseInt(digits.slice(2, 4), 10);

  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    return '유효한 시간을 작성하세요';
  }

  return '';
};
