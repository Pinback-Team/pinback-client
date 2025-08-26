import { cn } from '@/lib';
import { cva } from 'class-variance-authority';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  isDisabled?: boolean;
}

const buttonVariants = cva(
  'cursor-pointer rounded-[0.4rem] disabled:cursor-not-allowed w-full',
  {
    variants: {
      variant: {
        primary:
          'bg-gray900 text-white-bg hover:bg-gray800 active:bg-gray900 disabled:bg-gray200 disabled:text-font-ltgray-4',
        secondary:
          'bg-white-bg text-font-black-1 hover:bg-gray200 active:bg-white-bg disabled:bg-gray200 disabled:text-font-ltgray-4 outline outline-gray200',
      },
      size: {
        small: 'px-[1.2rem] py-[0.8rem] sub5-sb',
        medium: 'px-[1.2rem] py-[1.2rem] sub5-sb',
        large: 'px-[1.2rem] py-[1.5rem] sub3-sb',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

const Button = ({
  variant = 'primary',
  size,
  children,
  className,
  isDisabled = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
