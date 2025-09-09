import './App.css';
import {
  InfoBox,
  Button,
  Textarea,
  DateTime,
  Switch,
  PopupContainer,
} from '@pinback/design-system/ui';
import Logo from '@assets/logo.svg';
import { useState, useEffect } from 'react';
import { OgImageFetcher } from '@utils/OGFetch';
const App = () => {
  const [isRemindOn, setIsRemindOn] = useState(false);
  const [date, setDate] = useState('2025.10.10');
  const [time, setTime] = useState('19:00');
  const [memo, setMemo] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');

  // 날짜 유효성 검사
  const validateDate = (value: string) => {
    setDate(value);

    const regex = /^(\d{4})\.(\d{2})\.(\d{2})$/;
    const match = value.match(regex);

    if (!match) {
      setDateError('유효한 날짜를 작성하세요');
      return;
    }

    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);

    // 월 범위 확인
    if (month < 1 || month > 12) {
      setDateError('유효한 날짜를 작성하세요');
      return;
    }

    const testDate = new Date(year, month - 1, day);
    if (
      testDate.getFullYear() !== year ||
      testDate.getMonth() !== month - 1 ||
      testDate.getDate() !== day
    ) {
      setDateError('유효한 날짜를 작성하세요');
      return;
    }

    // 과거 날짜 체크
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (testDate < today) {
      setDateError('현재 시점 이후 날짜로 작성하세요');
      return;
    }

    setDateError('');
  };
  // 시간 유효성 검사
  const validateTime = (value: string | undefined) => {
    setTime(value || '');
    if (!value) {
      setTimeError('시간을 입력하세요');
      return;
    }

    const clean = value.replace(/[^0-9:]/g, '');

    const regex = /^(\d{1,2}):(\d{1,2})$/;
    const match = clean.match(regex);

    if (!match) {
      setTimeError('유효한 시간을 작성하세요');
      return;
    }

    const hour = parseInt(match[1], 10);
    const minute = parseInt(match[2], 10);

    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
      setTimeError('유효한 시간을 작성하세요');
      return;
    }

    setTimeError('');
  };

  const handleSwitchChange = (checked: boolean) => {
    setIsRemindOn(checked);
  };

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const activeTab = tabs[0];
      if (activeTab?.url) {
        const currentUrl = activeTab.url;
        setUrl(currentUrl);

        chrome.storage.local.set({ bookmarkedUrl: currentUrl }, () => {
          console.log('저장');
        });

        const imageUrl = await OgImageFetcher({
          url: currentUrl,
        });

        const isInternalChromePage =
          /^chrome:\/\//.test(currentUrl) ||
          /^chrome-extension:\/\//.test(currentUrl);
        const fetchedTitle = imageUrl?.title ?? '';

        if (!isInternalChromePage && !fetchedTitle) {
          window.close();
          return;
        }
        setTitle(imageUrl?.title ?? '');
        setDescription(imageUrl?.description ?? '');
        setImgUrl(imageUrl?.image ?? '');
        chrome.storage.local.set({ titleSave: title }, () => {
          console.log('Title saved to chrome storage');
        });
      }
    });
  }, []);
  const handleSave = async () => {
    try {
      const saveData = {
        url,
        title,
        description,
        imgUrl,
        memo,
        isRemindOn,
        date: isRemindOn ? date : null,
        time: isRemindOn ? time : null,
        createdAt: new Date().toISOString(),
      };
      // 내부 스토리지 저장 (유저 북마크 리스트)
      const result = await new Promise<{ bookmarks?: any[] }>((resolve) => {
        chrome.storage.local.get(['bookmarks'], (items) => resolve(items));
      });

      const bookmarks = result.bookmarks || [];
      bookmarks.push(saveData);

      await new Promise<void>((resolve) => {
        chrome.storage.local.set({ bookmarks }, resolve);
      });

      chrome.bookmarks.create(
        {
          parentId: '1',
          title: title || url,
          url: url,
        },
        (newBookmark) => {
          console.log('크롬 북마크바에 저장 완료:', newBookmark);
        }
      );

      window.close();
    } catch (error) {
      console.error('저장 중 오류:', error);
    }
  };

  return (
    <div className="App">
      <div className="relative flex h-[54.4rem] w-[31.2rem] items-center justify-center bg-[#00000000] text-2xl text-white">
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
        <div className="absolute top-0 flex h-[54.4rem] w-[31.2rem] flex-col justify-between gap-[1.6rem] rounded-[12px] bg-white px-[3.2rem] py-[2.4rem] text-black">
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
            {/* TODO: dropdown 자리 */}
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
                onChange={validateDate}
              />
              <DateTime
                type="time"
                state={
                  timeError ? 'error' : isRemindOn ? 'default' : 'disabled'
                }
                value={time}
                onChange={validateTime}
              />
            </div>

            {/* ✅ 에러 메시지 출력 */}
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
