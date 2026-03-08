import { cn } from '../../lib/utils';

export interface ToastProps {
  text?: string;
  children?: React.ReactNode;
}

export default function Toast({ text, children }: ToastProps) {
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
      <div className="flex items-center gap-[0.4rem]">
        {children}
        {text && <p className="caption2-sb whitespace-nowrap">{text}</p>}
      </div>
    </div>
  );
}
