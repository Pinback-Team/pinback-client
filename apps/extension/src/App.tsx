import './App.css';
import {
  InfoBox,
  Button,
  Textarea,
  DateTime,
  Switch,
  PopupContainer,
  Dropdown,
  validateDate, 
  validateTime
} from '@pinback/design-system/ui';
import { useState} from 'react';
import { usePageMeta } from './hooks/usePageMeta';
import { useSaveBookmark } from './hooks/useSaveBookmarks';
import { Icon } from '@pinback/design-system/icons';
import { usePostArticle,useGetCategoriesExtension, usePostCategories } from '@apis/query/queries';

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
  // api 연동 구간
  const {mutate:postArticle} = usePostArticle();
  const {mutate:postCategories} = usePostCategories();
  const { data } = useGetCategoriesExtension();
  interface Category {
    categoryId: number;
    categoryName: string;
    categoryColor:string;
  }
  const options = data?.data?.categories?.map((c: Category) => c.categoryName) ?? [];

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


  // useEffect(()=>{
  //   postSignup({
  //       "email": "test@gmail2.com", 
  //       "remindDefault": "08:00", 
  //       "fcmToken": "adlfdjlaj11212lkadfsjlkfdsa"
  //     })
  // },[])

  const showCategories = () => {
    console.log(options);
  }
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
    postArticle({url,categoryId:saveData.selectedCategory? parseInt(saveData.selectedCategory):0,memo:saveData.memo,remindTime:saveData.time});
  };
  const [categoryTitle, setCategoryTitle] = useState('');
  const [isPopError, setIsPopError] = useState(false);
  const [errorTxt, setErrorTxt] = useState('');
  const saveCategory = () => {
    // 20자 제한
    if (categoryTitle.length >20){
      setIsPopError(true);
      setErrorTxt('20자 이내로 작성해주세요');
    } else{
      postCategories({categoryName:categoryTitle});
      setIsPopupOpen(false);
    }
  }
  const handleSelect = (value: string | null, idx: number) => {
    const categoryId = data?.data?.categories[idx]?.categoryId.toString() ?? null;
    setSelected(categoryId);
    console.log("선택된 categoryId:", categoryId, "선택된 value:", value);
  };


  return (
    <div className="App">
      <div className="relative flex h-[56.8rem] w-[31.2rem] items-center justify-center">
        {isPopupOpen && (
          <PopupContainer
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            type="input"
            title="카테고리 추가하기"
            left="취소"
            right="확인"
            inputValue={categoryTitle}
            isError={isPopError}
            errortext={errorTxt}
            onInputChange={setCategoryTitle}
            placeholder="카테고리 제목을 입력해주세요"
            onLeftClick={() => setIsPopupOpen(false)}
            onRightClick={saveCategory}
          />
        )}
        <div className="flex flex-col justify-between gap-[1.6rem] rounded-[12px] bg-white px-[3.2rem] py-[2.4rem] text-black">
          <div className="mr-auto">
            <Icon name="main_logo" width={72} height={20} />
          </div>

          <InfoBox
            title={title || '제목 없음'}
            source={description || '웹페이지'}
            imgUrl={imgUrl}
          />

          <div onClick={showCategories}>
            <p className="caption1-sb mb-[0.4rem]">카테고리</p>
            <Dropdown
              options={options}
              selectedValue={selected}
              onChange={handleSelect}
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
