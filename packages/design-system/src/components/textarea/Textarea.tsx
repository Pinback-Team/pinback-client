// Textarea.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'maxLength'> {
  maxLength: number;
}

export function Textarea({
  className,
  maxLength,
  style,
  ...props
}: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      maxLength={maxLength}
      className={cn(
        'h-[12rem] w-full',
        'resize-none overflow-y-auto',
        'body3-r border-gray200 bg-white-bg text-font-gray-3 rounded-[0.4rem] border px-[0.8rem] py-[1.2rem] pr-[1.4rem]',
        'focus:border-input outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0',
        'ds-scrollbar',
        className
      )}
      style={{ scrollbarGutter: 'stable', ...style }}
      {...props}
    />
  );
}
