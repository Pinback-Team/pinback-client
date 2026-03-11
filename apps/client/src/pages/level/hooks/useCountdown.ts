import { useEffect, useState } from 'react';

export function useCountdown(targetTime: string) {
  const [timeLeft, setTimeLeft] = useState('00:00:00');

  useEffect(() => {
    const target = new Date(targetTime).getTime();
    const DAY = 24 * 60 * 60 * 1000;

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft('00:00:00');
        clearInterval(interval);
        return;
      }

      const displayDiff = diff > DAY ? diff % DAY : diff;

      const hours = Math.floor(displayDiff / (1000 * 60 * 60));
      const minutes = Math.floor(
        (displayDiff % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((displayDiff % (1000 * 60)) / 1000);

      const pad = (n: number) => String(n).padStart(2, '0');
      setTimeLeft(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return timeLeft;
}
