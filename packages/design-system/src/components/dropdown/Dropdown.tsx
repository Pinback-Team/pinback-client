import { Icon } from '@pinback/design-system/icons';
import { useState } from 'react';

interface DropdownProps {
  options: string[];
  selectedValue: string | null;
  onChange: (selected: string | null) => void;
  placeholder?: string;
  onAddItem?: () => void;
  addItemLabel?: string;
  limit?: number;
  className?: string;
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
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const showAddItemButton =
    onAddItem && (limit === undefined || options.length < limit);

  return (
    <div className={`relative w-full ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`body4-r flex h-[4.4rem] w-[24.8rem] items-center justify-between rounded-[4px] border px-[0.8rem] py-[1.2rem] transition-colors duration-200 ${isOpen ? 'border-main500' : 'border-gray200'}`}
      >
        <span className={selectedValue ? 'text-black' : 'text-font-gray-3'}>
          {selectedValue || placeholder}
        </span>
        <Icon
          name="ic_arrow_down_disable"
          width={16}
          height={16}
          // TODO: Icon 컴포넌트 내부에서 animation 관련 처리 고민하기
          // rotate={isOpen ? 180 : undefined}
          className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="common-shadow absolute z-10 mt-[1.5rem] w-[24.8rem] rounded-[0.4rem] bg-white">
          <ul className="flex flex-col gap-[0.2rem]">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className={`body4-r cursor-pointer p-[0.8rem] ${selectedValue === option ? 'text-main600' : 'text-font-gray-3'}`}
              >
                {option}
              </li>
            ))}
          </ul>

          {showAddItemButton && (
            <button
              type="button"
              onClick={() => {
                onAddItem?.();
                setIsOpen(false);
              }}
              className="text-main500 body4-r flex w-full cursor-pointer items-center gap-[0.8rem] p-[0.8rem]"
            >
              <Icon name="ic_plus" width={16} height={16} />
              {addItemLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
