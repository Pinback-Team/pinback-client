import { Icon } from '@pinback/design-system/icons';
import { cn } from '@pinback/design-system/utils';
import { ReactNode } from 'react';

type BalloonVariant = 'gray' | 'main';

interface BalloonProps {
  variant?: BalloonVariant;
  side?: 'top' | 'bottom' | 'left' | 'right';
  onClose?: () => void;
  children: ReactNode;
}

export function Balloon({
  variant = 'gray',
  side = 'bottom',
  onClose,
  children,
}: BalloonProps) {
  const variantStyle = {
    gray: 'bg-gray900 text-white',
    main: 'bg-main500 text-white',
  };

  return (
    <div className="relative inline-block">
      <div
        className={cn(
          'relative flex w-full items-start gap-3 whitespace-nowrap rounded-[5.5px] px-[1.2rem] py-[0.8rem]',
          variantStyle[variant]
        )}
      >
        <div className="flex-1">{children}</div>

        {onClose && (
          <button type="button" onClick={onClose}>
            <Icon name="ic_close" size={16} />
          </button>
        )}
      </div>

      {/* 꼬리 */}
      <div
        className={cn(
          'absolute h-[12px] w-[12px] rotate-45',
          variantStyle[variant],
          side === 'bottom' && '-bottom-1 left-1/2 -translate-x-1/2',
          side === 'top' && '-top-1 left-1/2 -translate-x-1/2',
          side === 'left' && '-left-1 top-1/2 -translate-y-1/2',
          side === 'right' && '-right-1 top-1/2 -translate-y-1/2'
        )}
      />
    </div>
  );
}
