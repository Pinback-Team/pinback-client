export interface BadgeProps {
  text: string;
  countNum?: number;
}
const Badge = ({ text, countNum }: BadgeProps) => {
  return (
    <div className="flex cursor-pointer items-center justify-center gap-[0.8rem]">
      <span className="sub3-sb">{text}</span>
      <span className="bg-main500 text-white-bg sub5-sb rounded-[0.4rem] px-[0.8rem] py-[0.4rem]">
        {countNum}
      </span>
    </div>
  );
};

export default Badge;
