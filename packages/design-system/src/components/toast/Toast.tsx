import { cn } from '@/lib/utils';

export interface ToastProps {
  text: string;
}

export default function Toast({ text }: ToastProps) {
  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        'bg-gray800 text-white-bg',
        'rounded-[0.8rem] px-[1.6rem] py-[1.2rem]',
        'common-shadow'
      )}
    >
      <p className="caption2-sb whitespace-pre-line">{text}</p>
    </div>
  );
}
