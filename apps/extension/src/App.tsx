import './App.css';
import {
  InfoBox,
  Button,
  Textarea,
  DateTime,
  Switch,
  PopupContainer,
  Dropdown,
} from '@pinback/design-system/ui';
import Logo from '@assets/logo.svg';
import { useState } from 'react';
import { usePageMeta } from './hooks/usePageMeta';
import { useSaveBookmark } from './hooks/useSaveBookmarks';
import { validateDate, validateTime } from '@utils/ValidateData';
const App = () => {
  const [isRemindOn, setIsRemindOn] = useState(false);
  const [memo, setMemo] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [selected, setSelected] = useState<string | null>(null);
  // 시간,날짜 검사 구간!
  const [date, setDate] = useState('2025.10.10');
  const [time, setTime] = useState('19:00');
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');

  const handleDateChange = (value: string) => {
    setDate(value);
    setDateError(validateDate(value));
  };

  const handleTimeChange = (value: string) => {
    setTime(value);
    setTimeError(validateTime(value));
  };

  // 스위치
  const handleSwitchChange = (checked: boolean) => {
    setIsRemindOn(checked);
  };

  const { url, title, description, imgUrl } = usePageMeta();
  const { save } = useSaveBookmark();

  const handleSave = async () => {
    save({
      url,
      title,
      description,
      imgUrl,
      memo,
      isRemindOn,
      selectedCategory: selected,
      date: isRemindOn ? date : null,
      time: isRemindOn ? time : null,
    });
    const saveData = {
      url,
      title,
      description,
      imgUrl,
      memo,
      isRemindOn,
      selectedCategory: selected,
      date: isRemindOn ? date : null,
      time: isRemindOn ? time : null,
      createdAt: new Date().toISOString(),
    };
    console.log('저장 데이터:', saveData);
  };

  return (
    <div className="App">
      <div className="relative flex h-[56.8rem] w-[31.2rem] items-center justify-center bg-[#00000000] text-2xl text-white">
        {isPopupOpen && (
          <PopupContainer
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            type="input"
            title="카테고리 추가하기"
            left="취소"
            right="확인"
            placeholder="카테고리 제목을 입력해주세요"
            onLeftClick={() => setIsPopupOpen(false)}
            onRightClick={() => setIsPopupOpen(false)}
          />
        )}
        <div className="flex flex-col justify-between gap-[1.6rem] rounded-[12px] bg-white px-[3.2rem] py-[2.4rem] text-black">
          <div className="mr-auto" onClick={() => setIsPopupOpen(true)}>
            <img src={Logo} alt="로고" />
          </div>

          <InfoBox
            title={title || '제목 없음'}
            source={description || '웹페이지'}
            imgUrl={imgUrl}
          />

          <div>
            <p className="caption1-sb mb-[0.4rem]">카테고리</p>
            <Dropdown
              options={['옵션1', '옵션2']}
              selectedValue={selected}
              onChange={(value) => setSelected(value)}
              placeholder="선택해주세요"
              onAddItem={() => setIsPopupOpen(true)}
              addItemLabel="추가하기"
            />
          </div>

          <div>
            <p className="caption1-sb mb-[0.4rem]">메모</p>
            <Textarea
              maxLength={100}
              placeholder="나중에 내가 꺼내줄 수 있게 살짝 적어줘!"
              value={memo}
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

            <div className="mb-[0.4rem] flex items-center justify-between gap-[0.8rem]">
              <DateTime
                type="date"
                state={
                  dateError ? 'error' : isRemindOn ? 'default' : 'disabled'
                }
                value={date}
                onChange={handleDateChange}
              />
              <DateTime
                type="time"
                state={
                  timeError ? 'error' : isRemindOn ? 'default' : 'disabled'
                }
                value={time}
                onChange={handleTimeChange}
              />
            </div>

            {/* 에러 메시지 출력 */}
            {dateError && <p className="body3-r text-error">{dateError}</p>}
            {timeError && <p className="body3-r text-error">{timeError}</p>}
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
