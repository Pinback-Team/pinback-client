import { cn } from '@pinback/design-system/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const row = cva(
  'flex items-center gap-[8px] rounded-[8px] px-[16px] py-[12px] transition-colors cursor-pointer',
  {
    variants: {
      active: { true: 'bg-main0', false: 'hover:bg-gray0' },
    },
    defaultVariants: { active: false },
  }
);

export interface SidebarRowProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof row> {
  icon?: React.ReactNode;
  rightSlot?: React.ReactNode;
  label: string;
}

export function SidebarRow({
  icon,
  label,
  rightSlot,
  active,
  className,
  ...props
}: SidebarRowProps) {
  return (
    <button type="button" className={cn(row({ active }), className)} {...props}>
      {icon}
      <span className="sub2-b text-font-gray-2 flex-1 text-left">{label}</span>
      {rightSlot}
    </button>
  );
}
