import { Icon } from '@/icons';
import { cva } from 'class-variance-authority';
export interface BadgeProps {
  text: string;
  countNum?: number;
  isActive: boolean;
  leftIcon?: React.ReactNode;
  onClick?: () => void;
}

const BadgeTxtStyleVariants = cva('sub3-b', {
  variants: {
    active: {
      true: 'text-font-black-1',
      false: 'text-font-ltgray-4',
    } as const,
  },
  defaultVariants: {
    active: false,
  },
});

const BadgeStyleVariants = cva(
  'text-white-bg sub5-sb rounded-[0.4rem] w-[2.5rem] h-[2.8rem] flex items-center justify-center',
  {
    variants: {
      active: {
        true: 'bg-main500',
        false: 'bg-gray300',
      } as const,
    },
    defaultVariants: {
      active: false,
    },
  }
);

const Badge = ({ text, countNum, isActive, onClick, leftIcon }: BadgeProps) => {
  return (
    <div
      className="flex cursor-pointer items-center justify-center gap-[0.8rem]"
      onClick={onClick}
    >
      {leftIcon}
      <span className={BadgeTxtStyleVariants({ active: isActive })}>
        {text}
      </span>
      {countNum && (
        <span className={BadgeStyleVariants({ active: isActive })}>
          {countNum}
        </span>
      )}
    </div>
  );
};

export default Badge;
