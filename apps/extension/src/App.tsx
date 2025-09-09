import './App.css';
import {
  InfoBox,
  Button,
  Textarea,
  DateTime,
  Switch,
} from '@pinback/design-system/ui';
import Logo from '@assets/logo.svg';
import { useState } from 'react';

const App = () => {
  const [isRemindOn, setIsRemindOn] = useState(false);
  const [date, setDate] = useState('2025.10.10');
  const [time, setTime] = useState('19:00');
  const [memo, setMemo] = useState('');
  const handleSwitchChange = (checked: boolean) => {
    setIsRemindOn(checked);
  };

  const handleSave = () => {
    console.log(memo);
    if (isRemindOn) {
      console.log('리마인드 날짜:', date);
      console.log('리마인드 시간:', time);
    } else {
      console.log('리마인드 꺼짐');
    }
  };

  return (
    <div className="App">
      <div className="relative flex h-[54.4rem] w-[31.2rem] items-center justify-center bg-[#00000000] text-2xl text-white">
        <div className="absolute top-0 flex h-[54.4rem] w-[31.2rem] flex-col justify-between gap-[1.6rem] rounded-[12px] bg-white px-[3.2rem] py-[2.4rem] text-black">
          <div className="mr-auto">
            <img src={Logo} alt="로고" />
          </div>
          <InfoBox title="ddd" source="ddd" imgUrl="ddd" />

          <div>
            <p className="caption1-sb mb-[0.4rem]">카테고리</p>
            {/* TODO : dropdown 자리 */}
          </div>

          <div>
            <p className="caption1-sb mb-[0.4rem]">메모</p>
            <Textarea
              maxLength={100}
              placeholder="나중에 내가 꺼내줄 수 있게 살짝 적어줘!"
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>

          <div>
            <div className="mb-[0.4rem] flex items-center justify-between">
              <p className="caption1-sb">리마인드</p>
              <Switch
                onCheckedChange={handleSwitchChange}
                checked={isRemindOn}
              />
            </div>

            <div className="flex items-center justify-between gap-[0.8rem]">
              <DateTime
                type="date"
                state={isRemindOn ? 'default' : 'disabled'}
                value={date}
                onChange={(value: string) => setDate(value)}
              />
              <DateTime
                type="time"
                state={isRemindOn ? 'default' : 'disabled'}
                value={time}
                onChange={(value: string) => setTime(value)}
              />
            </div>
          </div>

          <Button size="medium" onClick={handleSave}>
            저장
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
