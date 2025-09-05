import { useState, useId } from 'react';
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
  onClick: () => void;
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
  onClick,
}: AccordionItemProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;

  const panelId = useId();

  const toggle = () => {
    const next = !isOpen;
    onOpenChange?.(next);
    if (open === undefined) setInternalOpen(next);
  };

  return (
    <div className={cn(className)}>
      <SideItem
        icon={icon}
        label={label}
        active={active}
        trailing={trailing}
        open={isOpen}
        onTrailingClick={toggle}
        onClick={onClick}
      />

      <div
        id={panelId}
        className={cn(
          'grid overflow-hidden transition-[grid-template-rows]',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="min-h-0 gap-[0.2rem] bg-none py-[0.4rem]">
          {children}
        </div>
      </div>
    </div>
  );
}
