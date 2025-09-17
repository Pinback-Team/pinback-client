import { useEffect, useState } from 'react';

export function useCountdown(targetTime: string) {
  const [timeLeft, setTimeLeft] = useState('00:00:00');

  useEffect(() => {
    const target = new Date(targetTime).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft('00:00:00');
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const format = (n: number) => String(n).padStart(2, '0');
      setTimeLeft(`${format(hours)}:${format(minutes)}:${format(seconds)}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return timeLeft;
}
