import { cva } from 'class-variance-authority';
import { InputHTMLAttributes, Ref } from 'react';
import { cn } from '../../lib';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref: Ref<HTMLInputElement>;
  isError?: boolean;
  helperText?: string;
}

const inputBorderVariants = cva(
  'w-full rounded-[4px] border body4-r px-[0.8rem] py-[1.2rem] transition-colors',
  {
    variants: {
      isError: {
        true: 'border-error focus-within:border-error',
        false: 'border-gray100 focus-within:border-main400',
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
    <div className="flex flex-col gap-[0.6rem]">
      <div className={cn(inputBorderVariants({ isError }), className)}>
        <input
          ref={ref}
          className="body4-r placeholder-gray300 w-full focus:outline-none"
          aria-invalid={isError}
          {...props}
        />
      </div>

      {isError && helperText && (
        <div className="flex items-center gap-[0.2rem]">
          <p className="text-error body4-r">{helperText}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
