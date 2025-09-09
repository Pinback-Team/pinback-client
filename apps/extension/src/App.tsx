import './App.css';
import {
  InfoBox,
  Button,
  Textarea,
  DateTime,
  Switch,
} from '@pinback/design-system/ui';
import Logo from '@assets/logo.svg';
const App = () => {
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
            />
          </div>
          <div>
            <div className="mb-[0.4rem] flex items-center justify-between">
              <p className="caption1-sb">리마인드</p>
              <Switch />
            </div>
            <div className="flex items-center justify-between gap-[0.8rem]">
              <DateTime type="date" state="default" value="2025.10.10" />
              <DateTime type="time" state="default" value="19:00" />
            </div>
          </div>
          <Button size="medium" color="primary">
            저장
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
