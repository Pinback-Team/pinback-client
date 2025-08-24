// Textarea.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

const MAX_TEXTAREA_LENGTH = 500;

type TextareaProps = React.ComponentProps<'textarea'>;

function Textarea({
  className,
  maxLength = MAX_TEXTAREA_LENGTH,
  ...props
}: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      maxLength={maxLength}
      className={cn(
        'h-[12rem] w-[24.8rem]',
        'resize-none overflow-y-auto',
        'body3-r border-gray200 bg-white-bg text-font-gray-3 rounded-[0.4rem] border px-[0.8rem] py-[1.2rem]',
        'focus:border-input outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0',
        className
      )}
      style={{ scrollbarGutter: 'stable' }}
      {...props}
    />
  );
}

export { Textarea };
