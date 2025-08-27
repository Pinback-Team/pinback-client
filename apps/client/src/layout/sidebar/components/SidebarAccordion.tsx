// SidebarAccordion.tsx
import * as React from 'react';
import { SidebarRow, type SidebarRowProps } from './SidebarRow';
import { cn } from '@pinback/design-system/utils';

export interface SidebarAccordionProps {
  header: Omit<SidebarRowProps, 'rightSlot'>;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  children: React.ReactNode;
}

export function SidebarAccordion({
  header,
  defaultOpen,
  open: controlled,
  onOpenChange,
  children,
}: SidebarAccordionProps) {
  const [uncontrolled, setUncontrolled] = React.useState(!!defaultOpen);
  const open = controlled ?? uncontrolled;
  const panelId = React.useId();

  const toggle = () => {
    const next = !open;
    controlled === undefined ? setUncontrolled(next) : onOpenChange?.(next);
  };

  return (
    <div className="w-full">
      <SidebarRow
        {...header}
        onClick={(e) => {
          header.onClick?.(e as any);
          toggle();
        }}
        aria-expanded={open}
        aria-controls={panelId}
        rightSlot={
          <svg
            className={cn('size-4 transition-transform', open && 'rotate-180')}
            viewBox="0 0 24 24"
          >
            <path d="M7 10l5 5 5-5" stroke="currentColor" fill="none" />
          </svg>
        }
        active={open}
      />

      <div
        id={panelId}
        role="region"
        aria-hidden={!open}
        className={cn(
          'grid overflow-hidden transition-[grid-template-rows] duration-200',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="min-h-0">
          <ul className="mt-[4px] space-y-[4px]">{children}</ul>
        </div>
      </div>
    </div>
  );
}
