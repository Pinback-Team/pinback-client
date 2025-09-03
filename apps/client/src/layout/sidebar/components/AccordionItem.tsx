import * as React from 'react';
import { cn } from '@pinback/design-system/utils';
import SideItem, { type IconToken } from './SideItem';

interface AccordionItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  icon: IconToken;
  label: string;
  children: React.ReactNode;
  active: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trailing?: boolean;
  className?: string;
}

export default function AccordionItem({
  icon,
  label,
  children,
  active,
  open,
  defaultOpen = false,
  onOpenChange,
  trailing = true,
  className,
  ...rest
}: AccordionItemProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = open ?? internalOpen;

  const panelId = React.useId();

  const toggle = () => {
    const next = !isOpen;
    onOpenChange?.(next);
    if (open === undefined) setInternalOpen(next);
  };

  return (
    <div className={cn('space-y-2', className)} {...rest}>
      <SideItem
        icon={icon}
        label={label}
        active={active}
        trailing={trailing}
        open={isOpen}
        onTrailingClick={toggle}
        trailingAriaExpanded={isOpen}
        trailingAriaControls={panelId}
      />

      <div
        id={panelId}
        className={cn(
          'grid overflow-hidden transition-[grid-template-rows]',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="bg-main0 min-h-0 rounded-[0.4rem] px-2 py-2">
          {children}
        </div>
      </div>
    </div>
  );
}
