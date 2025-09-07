import './App.css';
import { InfoBox, Button, Textarea } from '@pinback/design-system/ui';
const App = () => {
  return (
    <div className="App">
      <div className="relative flex h-[54.4rem] w-[31.2rem] items-center justify-center bg-[#00000000] text-2xl text-white">
        <div className="absolute top-0 flex h-[54.4rem] w-[31.2rem] flex-col justify-between gap-[1.6rem] rounded-[12px] bg-white px-[3.2rem] py-[2.4rem] text-black">
          <div className="text-black">ddd</div>
          <InfoBox title="ddd" source="ddd" imgUrl="ddd" />
          <div>
            <p className="caption1-sb mb-[0.4rem]">카테고리</p>
            {/* TODO : dropdown 자리 */}
          </div>
          <div>
            <p className="caption1-sb mb-[0.4rem]">메모</p>
            <Textarea maxLength={100} />
          </div>
          <div>
            <p className="caption1-sb mb-[0.4rem]">리마인드</p>
            {/* TODO : 리마인드 자리 */}
          </div>
          <Button size="medium" color="primary" />
        </div>
      </div>
    </div>
  );
};

export default App;
