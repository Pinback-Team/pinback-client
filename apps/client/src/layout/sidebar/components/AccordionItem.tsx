import { cn } from '@pinback/design-system/utils';
import { Icon } from '@pinback/design-system/icons';
import { useState } from 'react';

import SideItem from './SideItem';
// AccordionItem.tsx
interface AccordionItemProps {
  icon: React.ReactNode;
  label: string;
  defaultOpen?: boolean;
  children: React.ReactNode; // 펼쳐질 패널(카테고리 목록/필터/드롭다운 등)
}

export function AccordionItem({
  icon,
  label,
  defaultOpen,
  children,
}: AccordionItemProps) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="w-full rounded-[0.8rem] text-left focus:outline-none focus-visible:ring-2"
      >
        <SideItem
          icon={icon}
          label={label}
          active={open}
          trailing={
            <Icon
              className={cn('transition', open && 'rotate-180')}
              name={'ic_arrow_down_active'}
            />
          }
        />
      </button>

      <div
        role="region"
        aria-hidden={!open}
        className={cn(
          'grid overflow-hidden transition-[grid-template-rows]',
          open ? 'mt-2 grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="bg-main0 min-h-0 rounded-[0.8rem] px-2 py-2">
          {children}
        </div>
      </div>
    </div>
  );
}
