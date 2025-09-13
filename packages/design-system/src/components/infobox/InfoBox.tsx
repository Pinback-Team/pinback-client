interface InfoBoxProps {
  title: string;
  source: string;
  imgUrl?: string;
}
const InfoBox = ({ title, source, imgUrl }: InfoBoxProps) => {
  return (
    <div className="border-main400 flex h-[6.8rem] w-[full] items-center justify-between gap-[0.8rem] rounded-[4px] border bg-white px-[0.8rem] py-[1.2rem]">
      <img
        className="h-[4.4rem] w-[4.4rem] rounded-[0.4rem] object-cover"
        src={imgUrl}
      />
      <div className="items-left flex flex-col justify-center gap-[0.2rem] text-left">
        <p className="sub3-sb w-[18rem] truncate">{title}</p>
        <p className="caption2-m text-font-gray-3 w-[18rem] truncate">
          {source}
        </p>
      </div>
    </div>
  );
};
export default InfoBox;
