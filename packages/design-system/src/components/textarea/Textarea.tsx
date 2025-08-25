// Textarea.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

export const MAX_TEXTAREA_LENGTH = 500;
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** 스크롤바 등장 시 레이아웃 점프 방지(default: true) */
  stableScrollbarGutter?: boolean;
}

export function Textarea({
  className,
  maxLength = MAX_TEXTAREA_LENGTH,
  stableScrollbarGutter = true,
  style,
  ...props
}: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      maxLength={maxLength}
      className={cn(
        'h-[12rem] w-[24.8rem]',
        'resize-none overflow-y-auto',
        'body3-r border-gray200 bg-white-bg text-font-gray-3 rounded-[0.4rem] border px-[0.8rem] py-[1.2rem] pr-[1.4rem]',
        'focus:border-input outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0',
        'ds-scrollbar',
        className
      )}
      style={{
        ...(stableScrollbarGutter ? { scrollbarGutter: 'stable' } : {}),
        ...style, // 사용자가 넘긴 style이 최종 우선
      }}
      {...props}
    />
  );
}
