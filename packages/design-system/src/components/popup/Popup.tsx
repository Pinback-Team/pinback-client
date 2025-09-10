import Input from '../input/Input';

type PopupType = 'input' | 'subtext' | 'default';

interface BasePopupProps {
  type: PopupType;
  title: string;
  left: string;
  right: string;
  subtext?: string;
  placeholder?: string;
  isError?: boolean;
  helperText?: string; 
  inputValue?: string;
  onInputChange?: (value: string) => void;
  onLeftClick?: () => void;
  onRightClick?: () => void;
}
const Popup = ({
  type,
  subtext,
  placeholder,
  title,
  left,
  right,
  helperText,
  isError,
  inputValue,
  onInputChange,
  onLeftClick,
  onRightClick,
}: BasePopupProps) => {
  return (
    <div className="bg-white-bg flex w-[26rem] cursor-pointer flex-col items-center justify-center rounded-[1.2rem] bg-white px-[1.6rem] py-[2.4rem] shadow-[0_0_32px_0_rgba(0,0,0,0.10)]">
      <div className="sub2-sb text-font-black-1 pb-[0.8rem]">{title}</div>
      {type === 'input' && (
        <div className="w-full py-[0.8rem]">
          <Input
            placeholder={placeholder}
            helperText={helperText}
            isError={isError}
            value={inputValue}
            onChange={(e) => onInputChange?.(e.target.value)}
          />
        </div>
      )}
      {type === 'subtext' && (
        <div className="body3-r text-font-gray-2 w-full py-[0.8rem] text-center">
          {subtext}
        </div>
      )}
      {/* type===default일 떄는 아무것도 없음 */}
      <div className="flex flex-row items-center justify-center gap-[1.2rem] pt-[0.8rem]">
        <button
          className="border-gray200 sub5-sb bg-white-bg text-font-black-1 w-[10.8rem] rounded-[0.4rem] border py-[0.85rem]"
          onClick={onLeftClick}
        >
          {left}
        </button>
        <button
          className="sub5-sb bg-gray900 text-white-bg w-[10.8rem] rounded-[0.4rem] py-[0.85rem]"
          onClick={onRightClick}
        >
          {right}
        </button>
      </div>
    </div>
  );
};

export default Popup;
