import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Toast from './Toast';

export interface AutoDismissToastProps {
  text: string;
  duration?: number;
  fadeMs?: number;
  onClose?: () => void;
  className?: string;
}

export default function AutoDismissToast({
  text,
  duration = 3000,
  fadeMs = 200,
  onClose,
  className,
}: AutoDismissToastProps) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setFading(true), duration);
    const t2 = window.setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration + fadeMs);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [duration, fadeMs, onClose]);

  if (!visible) return null;

  return (
    <div className={cn(className)}>
      <div
        className={cn(
          'transition-opacity ease-out',
          fading ? 'opacity-0' : 'opacity-100'
        )}
        style={{ transitionDuration: `${fadeMs}ms` }}
      >
        <Toast text={text} />
      </div>
    </div>
  );
}
