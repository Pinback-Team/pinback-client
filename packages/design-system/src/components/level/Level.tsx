interface LevelProps {
  level: number;
}
const Level = ({ level }: LevelProps) => {
  return (
    <span className="caption2-sb text-main600 bg-main100 rounded-[0.4rem] px-[0.8rem] py-[0.2rem]">
      Lv.{level}
    </span>
  );
};

export default Level;
