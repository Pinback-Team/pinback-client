import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

const track = cva('relative w-full overflow-hidden rounded-full', {
  variants: {
    variant: {
      profile: 'h-[0.4rem] bg-gray100',
      tree: 'h-[1.2rem] bg-gray100',
    },
  },
  defaultVariants: { variant: 'profile' },
});

const indicator = cva(
  'h-full rounded-full transition-[width] duration-300 ease-out',
  {
    variants: {
      variant: {
        profile: 'bg-main400',
        tree: 'bg-gradient-to-r from-gradient-start to-gradient-end',
      },
    },
    defaultVariants: { variant: 'profile' },
  }
);

export interface ProgressProps
  extends Omit<
      React.ComponentProps<typeof ProgressPrimitive.Root>,
      'value' | 'max'
    >,
    VariantProps<typeof track> {
  value: number;
}

function Progress({ className, variant, value, ...props }: ProgressProps) {
  const progressPercent = Math.max(0, Math.min(100, value));

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(track({ variant }), className)}
      value={progressPercent}
      max={100}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={indicator({ variant })}
        style={{ width: `${progressPercent}%` }}
      />
    </ProgressPrimitive.Root>
  );
}
export default Progress;
