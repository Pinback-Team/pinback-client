import { cva } from 'class-variance-authority';
import { useState } from 'react';
export interface BadgeProps {
  text: string;
  countNum?: number;
}
const BadgeTxtStyleVariants = cva('sub3-b', {
  variants: {
    click: {
      true: 'text-font-black-1',
      false: 'text-font-ltgray-4',
    } as const,
  },
  defaultVariants: {
    click: false,
  },
});
const BadgeStyleVariants = cva(
  'text-white-bg sub5-sb rounded-[0.4rem] px-[0.8rem] py-[0.4rem]',
  {
    variants: {
      click: {
        true: 'bg-main500',
        false: 'bg-gray300',
      } as const,
    },
    defaultVariants: {
      click: false,
    },
  }
);
const Badge = ({ text, countNum }: BadgeProps) => {
  const [isClick, setIsClick] = useState(false);
  return (
    <div
      className="flex cursor-pointer items-center justify-center gap-[0.8rem]"
      onClick={() => setIsClick(true)}
    >
      <span className={BadgeTxtStyleVariants({ click: isClick })}>{text}</span>
      <span className={BadgeStyleVariants({ click: isClick })}>{countNum}</span>
    </div>
  );
};

export default Badge;
