// Progress.tsx
import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const track = cva('relative w-full overflow-hidden rounded-full', {
  variants: {
    variant: {
      profile: 'h-[0.4rem] bg-gray100',
      tree: 'h-[1.2rem]  bg-gray100',
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
        tree: 'h-[1.2rem] bg-gradient-to-r from-gradient-start to-gradient-end',
      },
    },
    defaultVariants: { variant: 'profile' },
  }
);

type RootProps = React.ComponentProps<typeof ProgressPrimitive.Root>;
type Props = Omit<RootProps, 'value' | 'max'> &
  VariantProps<typeof track> & {
    /** 0–100 (Controls가 문자열을 줄 수도 있어 number|string 허용) */
    value: number | string; // ← 필수
  };

export function Progress({ className, variant, value, ...props }: Props) {
  const v = Math.max(0, Math.min(100, Number(value))); // 숫자 변환 + 클램프

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(track({ variant }), className)}
      value={v}
      max={100}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={indicator({ variant })}
        style={{ width: `${v}%` }}
      />
    </ProgressPrimitive.Root>
  );
}
