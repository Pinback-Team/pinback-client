import dotori from '../../../../../assets/onBoarding/icons/dotori.svg';
import AlarmBox from './AlarmBox';
interface AlarmStepProps {
  selected: 1 | 2 | 3;
  setSelected: (n: 1 | 2 | 3) => void;
}
const AlarmStep = ({ selected, setSelected }: AlarmStepProps) => {
  return (
    <div className="flex flex-col items-center justify-between">
      <img src={dotori} className="mb-[1.2rem]" alt="dotori" />
      <p className="head2 text-font-black-1">
        도토리 찾으러 갈 시간을 정해볼까요?
      </p>
      <p className="body2-m text-font-gray-3 mb-[4.3rem] mt-[0.8rem] text-center">
        매일 지정한 시간에 저장한 북마크를 리마인드해드려요
      </p>

      <div className="mb-[2rem] flex w-full items-center justify-center gap-[1.4rem]">
        {[1, 2, 3].map((n) => (
          <AlarmBox
            key={n}
            select={n as 1 | 2 | 3}
            isDisabled={selected === n}
            onClick={() => setSelected(n as 1 | 2 | 3)}
          />
        ))}
      </div>
    </div>
  );
};

export default AlarmStep;
