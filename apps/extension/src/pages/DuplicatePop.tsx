import { Icon } from "@pinback/design-system/icons";
interface DuplicatePopProps {
  onLeftClick: () => void;
  onRightClick: () => void;
}

const DuplicatePop = ({onLeftClick,onRightClick} : DuplicatePopProps) => {
  return (
        <div className="bg-white-bg flex w-[26rem] cursor-pointer flex-col items-center justify-center rounded-[1.2rem] px-[1.6rem] py-[2.4rem] shadow-[0_0_32px_0_rgba(0,0,0,0.10)]">
            <Icon name="saved" width={72} height={72} className="m-auto text-center"/>
            <div className="sub2-sb text-font-black-1 pb-[0.8rem]">치삐가 이미 챙겨뒀어요! <Icon name="dotori" /> </div>  
            <div className="flex flex-row items-center justify-center gap-[1.2rem] pt-[0.8rem]">
                <button
                    className="border-gray200 sub5-sb bg-white-bg text-font-black-1 w-[10.8rem] rounded-[0.4rem] border py-[0.85rem]"
                    onClick={onLeftClick}
                    >
                수정하기
                </button>
                <button
                    className="sub5-sb bg-gray900 text-white-bg w-[10.8rem] rounded-[0.4rem] py-[0.85rem]"
                    onClick={onRightClick}
                    >
                대시보드
                </button>
            </div>
        </div>
  )
};

export default DuplicatePop;