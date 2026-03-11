import '@ncdai/react-wheel-picker/style.css';
import * as WheelPickerPrimitive from '@ncdai/react-wheel-picker';

import { cn } from '../../lib/utils';

type WheelPickerOption = WheelPickerPrimitive.WheelPickerOption;
type WheelPickerClassNames = WheelPickerPrimitive.WheelPickerClassNames;

// 타입을 명시적으로 정의
interface WheelPickerWrapperProps {
  className?: string;
  children: React.ReactNode;
}

interface WheelPickerComponentProps {
  classNames?: WheelPickerClassNames;
  options: WheelPickerOption[];
  value?: string;
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
  infinite?: boolean;
  optionItemHeight?: number;
  'aria-label'?: string;
}

function WheelPickerWrapper({
  className,
  children,
  ...props
}: WheelPickerWrapperProps) {
  return (
    <WheelPickerPrimitive.WheelPickerWrapper
      className={cn('flex', className)}
      {...props}
    >
      {children}
    </WheelPickerPrimitive.WheelPickerWrapper>
  );
}

function WheelPicker({
  classNames,
  options,
  ...props
}: WheelPickerComponentProps) {
  return (
    <WheelPickerPrimitive.WheelPicker
      options={options}
      classNames={{
        ...classNames,
        optionItem: cn(
          'text-gray300 !font-medium !text-[1.6rem] !leading-[150%] !tracking-[-0.025em]',
          classNames?.optionItem
        ),
        highlightWrapper: cn(
          'bg-white border-y-[0.5px] border-gray300 !font-medium !text-[1.6rem] !leading-[150%] !tracking-[-0.025em]',
          classNames?.highlightWrapper
        ),
      }}
      {...props}
    />
  );
}

export { WheelPicker, WheelPickerWrapper };
export type { WheelPickerClassNames, WheelPickerOption };
