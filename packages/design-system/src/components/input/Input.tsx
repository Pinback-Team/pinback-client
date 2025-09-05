import { cva } from 'class-variance-authority';
import { InputHTMLAttributes, Ref } from 'react';
import { cn } from '../../lib';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
  isError?: boolean;
  helperText?: string;
}

const inputBorderVariants = cva(
  'w-full h-[4.4rem] rounded-[4px] border box-border body4-r px-[0.8rem] py-[1.2rem] transition-colors ',
  {
    variants: {
      isError: {
        true: 'border-error focus-within:border-error',
        false: 'border-gray200 focus-within:border-main400',
      },
    },
    defaultVariants: {
      isError: false,
    },
  }
);

const Input = ({
  ref,
  isError,
  className,
  helperText,
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col gap-[0.5rem]">
      <div className={cn(inputBorderVariants({ isError }), className)}>
        <input
          ref={ref}
          className="placeholder-font-gray-3 w-full focus:outline-none"
          aria-invalid={isError}
          {...props}
        />
      </div>

      {isError && helperText && (
        <div className="flex items-center">
          <p className="text-error body4-r">{helperText}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
