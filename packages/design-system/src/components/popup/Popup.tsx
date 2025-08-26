interface PopupProps {
  type: 'input' | 'subtext' | 'default';
  subtext?: string;
  placeholder?: string;
  title: string;
  left: string;
  right: string;
}

const Popup = ({ type }: PopupProps) => {
  return (
    <div className="flex w-[26rem] cursor-pointer flex-col items-center justify-center rounded-[1.2rem] bg-white px-[1.6rem] py-[2.4rem] shadow-[0_0_32px_0_rgba(0,0,0,0.10)]">
      <div className="sub2-sb text-font-black-1 pb-[0.8rem]">
        제목 텍스트 입력
      </div>
      <div className="body3-r text-font-gray-2 py-[0.8rem]">{type}</div>
      <div className="flex flex-row items-center justify-center gap-[1.2rem] pt-[0.8rem]">
        <button className="border-gray200 sub5-sb bg-white-bg text-font-black-1 w-[10.8rem] rounded-[0.4rem] border py-[0.8rem]">
          버튼1
        </button>
        <button className="sub5-sb bg-gray900 text-white-bg w-[10.8rem] rounded-[0.4rem] py-[0.8rem]">
          버튼2
        </button>
      </div>
    </div>
  );
};

export default Popup;
