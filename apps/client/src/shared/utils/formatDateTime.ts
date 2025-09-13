export const formatLocalDateTime = (date: Date = new Date()) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mi = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}:${ss}`;
};

export const updateDate = (date: string) => {
  if (!date) return '';
  return date.replace(/-/g, '.');
};

// HH:mm:ss → HH:mm
export const updateTime = (time: string) => {
  if (!time) return '';
  return time.slice(0, 5);
};
