import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <div className="text-main600">
      <SwitchPrimitive.Root
        data-slot="switch"
        className={cn(
          'data-[state=checked]:bg-main400 data-[state=unchecked]:bg-gray200 focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 shadow-xs peer inline-flex h-[2rem] w-[4rem] shrink-0 items-center rounded-full border border-transparent outline-none transition-all focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          data-slot="switch-thumb"
          className={cn(
            'bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-[1.6rem] rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[2.1rem] data-[state=unchecked]:translate-x-[0.1rem]'
          )}
        />
      </SwitchPrimitive.Root>
    </div>
  );
}

export { Switch };
