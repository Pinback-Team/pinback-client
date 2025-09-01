import '@ncdai/react-wheel-picker/style.css';

import * as WheelPickerPrimitive from '@ncdai/react-wheel-picker';

import { cn } from '@/lib/utils';

type WheelPickerOption = WheelPickerPrimitive.WheelPickerOption;
type WheelPickerClassNames = WheelPickerPrimitive.WheelPickerClassNames;

function WheelPickerWrapper({
  className,
  ...props
}: React.ComponentProps<typeof WheelPickerPrimitive.WheelPickerWrapper>) {
  return (
    <WheelPickerPrimitive.WheelPickerWrapper
      className={cn('flex', className)}
      {...props}
    />
  );
}

function WheelPicker({
  classNames,
  ...props
}: React.ComponentProps<typeof WheelPickerPrimitive.WheelPicker>) {
  return (
    <WheelPickerPrimitive.WheelPicker
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
