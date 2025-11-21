import avatar1 from '/assets/onBoarding/icons/chippi_morning.svg';
import avatar2 from '/assets/onBoarding/icons/chippi_night.svg';
import avatar3 from '/assets/onBoarding/icons/chippi_bell.svg';

export interface AlarmType {
  img: string;
  title: string;
  time: string;
}

export const AlarmsType: AlarmType[] = [
  { img: avatar1, title: '아침형 치삐', time: '오전 9시' },
  { img: avatar2, title: '저녁형 치삐', time: '오후 8시' },
  { img: avatar3, title: '사용자 설정', time: '' },
];
