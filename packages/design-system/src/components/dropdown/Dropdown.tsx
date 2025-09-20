import { Icon } from '@pinback/design-system/icons';
import { useState } from 'react';

interface DropdownProps {
  options: string[];
  selectedValue: string | null;
  onChange: (selected: string | null, index: number) => void;
  placeholder: string;
  onAddItem?: () => void;
  addItemLabel?: string;
  limit?: number;
  className?: string;
  onToggle?: (isOpen: boolean) => void;
}

const Dropdown = ({
  options,
  selectedValue,
  onChange,
  placeholder,
  onAddItem,
  addItemLabel,
  limit,
  className = '',
  onToggle,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    onToggle?.(next);
  };

  const handleSelect = (option: string, idx: number) => {
    onChange(option, idx);
    setIsOpen(false);
    onToggle?.(false);
  };

  const showAddItemButton =
    onAddItem && (limit === undefined || options.length < limit);

  return (
    <div className={`relative w-[24.8rem] ${className}`}>
      <button
        type="button"
        onClick={handleToggle}
        className={`body4-r flex h-[4.4rem] w-full items-center justify-between rounded-[4px] border px-[0.8rem] py-[1.2rem] transition-colors duration-200 ${isOpen ? 'border-main500' : 'border-gray200'}`}
      >
        <span className={selectedValue ? 'text-black' : 'text-font-gray-3'}>
          {selectedValue || placeholder}
        </span>
        <Icon
          name="ic_arrow_down_disable"
          width={16}
          height={16}
          rotate={isOpen ? 180 : undefined}
          hasRotateAnimation={true}
        />
      </button>

      {isOpen && (
        <div className="common-shadow ds-scrollbar absolute z-10 mt-[1.5rem] h-[20.4rem] w-full overflow-y-auto rounded-[0.4rem] bg-white p-[0.8rem]">
          <ul className="flex flex-col gap-[0.2rem]">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option, options.indexOf(option))}
                className={`body4-r h-[3.6rem] cursor-pointer p-[0.8rem] ${selectedValue === option ? 'text-main600' : 'text-font-gray-3'}`}
              >
                {option}
              </li>
            ))}

            {showAddItemButton && (
              <button
                type="button"
                onClick={() => {
                  onAddItem?.();
                  setIsOpen(false);
                  onToggle?.(false);
                }}
                className="text-main500 body4-r flex w-full cursor-pointer items-center gap-[0.8rem] p-[0.8rem]"
              >
                <Icon name="ic_plus" width={16} height={16} />
                {addItemLabel}
              </button>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
