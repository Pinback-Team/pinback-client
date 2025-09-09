import './App.css';
import {
  InfoBox,
  Button,
  Textarea,
  DateTime,
  Switch,
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

      const result = await new Promise<{ bookmarks?: any[] }>((resolve) => {
        chrome.storage.local.get(['bookmarks'], (items) => resolve(items));
      });

      const bookmarks = result.bookmarks || [];
      bookmarks.push(saveData);

      await new Promise<void>((resolve) => {
        chrome.storage.local.set({ bookmarks }, resolve);
      });

      console.log('북마크 저장 완료');
      window.close();
    } catch (error) {
      console.error('저장 중 오류:', error);
    }
  };

  return (
    <div className="App">
      <div className="relative flex h-[54.4rem] w-[31.2rem] items-center justify-center bg-[#00000000] text-2xl text-white">
        <div className="absolute top-0 flex h-[54.4rem] w-[31.2rem] flex-col justify-between gap-[1.6rem] rounded-[12px] bg-white px-[3.2rem] py-[2.4rem] text-black">
          <div className="mr-auto">
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
