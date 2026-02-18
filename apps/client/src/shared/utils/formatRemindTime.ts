function formatRemindTime(time: string | undefined): string {
  if (!time) return '';

  const [period, timePart] = time.split(' ');
  const [hourStr, minute] = timePart.split(':');

  let hour = Number(hourStr);

  if (isNaN(hour)) return '';

  if (period === 'PM') {
    hour = hour === 12 ? 12 : hour - 12;
  }

  if (period === 'AM' && hour === 0) {
    hour = 12;
  }

  return `${period} ${hour}:${minute}`;
}

export default formatRemindTime;
