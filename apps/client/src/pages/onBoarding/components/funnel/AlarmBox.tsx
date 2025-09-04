import avatar1 from '../../../../assets/onBoarding/icons/chippi_morning.svg';
import avatar2 from '../../../../assets/onBoarding/icons/chippi_night.svg';
import avatar3 from '../../../../assets/onBoarding/icons/chippi_bell.svg';
import { cva } from 'class-variance-authority';

interface AlarmBoxProps {
  select: 1 | 2 | 3;
  isDisabled: boolean;
  onClick?: () => void;
}

const AlarmsType = [
  { img: avatar1, title: '아침형 치삐', time: '오전 9시' },
  { img: avatar2, title: '저녁형 치삐', time: '오후 8시' },
  { img: avatar3, title: '사용자 설정' },
];

const boxStyle = cva(
  'flex h-[22.4rem] w-[18rem] flex-col items-center rounded-[1.2rem] px-[3.9rem] pb-[2.6rem] pt-[3.6rem] cursor-pointer transition',
  {
    variants: {
      disabled: {
        true: 'border-main400 bg-main100 border',
        false: 'bg-white border border-transparent hover:border-main300',
      },
    },
    defaultVariants: { disabled: false },
  }
);

const AlarmBox = ({ select, isDisabled, onClick }: AlarmBoxProps) => {
  return (
    <div className={boxStyle({ disabled: isDisabled })} onClick={onClick}>
      <img src={AlarmsType[select - 1].img} alt="chippi" />
      <p
        className={`sub3-sb ${
          isDisabled ? 'text-main500' : 'text-font-black-1'
        }`}
      >
        {AlarmsType[select - 1].title}
      </p>
      {select <= 2 && (
        <p className="caption2-m text-font-gray-3">
          {AlarmsType[select - 1].time}
        </p>
      )}
    </div>
  );
};

export default AlarmBox;
