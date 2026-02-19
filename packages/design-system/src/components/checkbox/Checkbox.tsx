import { cva } from 'class-variance-authority';
import { useId, useState } from 'react';
import { cn } from '../../lib/utils';

interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'size' | 'checked' | 'defaultChecked' | 'onChange'
  > {
  isSelected?: boolean;
  defaultSelected?: boolean;
  onSelectedChange?: (checked: boolean) => void;
  size?: 'small' | 'medium';
}

const checkboxBoxVariants = cva(
  'inline-flex items-center justify-center rounded-[0.4rem] transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-main400 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white-bg',
  {
    variants: {
      size: {
        small: 'h-[2rem] w-[2rem]',
        medium: 'h-[2.8rem] w-[2.8rem]',
      },
      selected: {
        true: 'bg-main500 border-[1.5px] border-main500',
        false: 'bg-gray0 border-gray100 border-[1.5px]',
      },
      disabled: {
        true: 'opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      size: 'medium',
      selected: false,
      disabled: false,
    },
  }
);

const checkIconVariants = cva('', {
  variants: {
    size: {
      small: 'h-[0.8rem] w-[1.1rem]',
      medium: 'h-[0.9rem] w-[1.2rem]',
    },
    selected: {
      true: 'text-white',
      false: 'text-gray300',
    },
  },
  defaultVariants: {
    size: 'medium',
    selected: false,
  },
});

const Checkbox = ({
  isSelected,
  defaultSelected = false,
  onSelectedChange,
  size = 'medium',
  className,
  id,
  disabled,
  ...props
}: CheckboxProps) => {
  const [internalSelected, setInternalSelected] = useState(defaultSelected);
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const selected = isSelected ?? internalSelected;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextChecked = e.target.checked;
    onSelectedChange?.(nextChecked);
    if (isSelected === undefined) {
      setInternalSelected(nextChecked);
    }
  };

  return (
    <div
      className={cn(
        'inline-flex items-center',
        disabled && 'cursor-not-allowed',
        className
      )}
    >
      <input
        id={inputId}
        type="checkbox"
        className="peer sr-only"
        checked={selected}
        disabled={disabled}
        onChange={handleChange}
        {...props}
      />
      <span
        aria-hidden="true"
        data-state={selected ? 'checked' : 'unchecked'}
        className={cn(
          checkboxBoxVariants({
            size,
            selected,
            disabled: Boolean(disabled),
          })
        )}
      >
        <svg
          viewBox="0 0 12 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(checkIconVariants({ size, selected }))}
        >
          <path
            d="M1 4.5L4.5 8L11 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
};

export default Checkbox;
