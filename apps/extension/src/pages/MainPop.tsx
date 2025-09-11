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
import { useState,useEffect } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useSaveBookmark } from '../hooks/useSaveBookmarks';
import { Icon } from '@pinback/design-system/icons';
import { usePostArticle,useGetCategoriesExtension, usePostCategories, useGetRemindTime, usePutArticle} from '@apis/query/queries';

export interface CategoryResponse {
  categoryId: number;
  categoryName: string;
  categoryColor: string;
}

export interface ArticleResponse {
  id: number;
  url: string;
  memo: string;
  remindAt: string | null;   // "2025-09-11T23:06:32.036065" 또는 null
  categoryResponse: CategoryResponse;
  createdAt: string;         // ISO DateTime string
}
interface MainPopProps {
    type: "add" | "edit";
    savedData?: ArticleResponse  | null;
}
const MainPop = ({type, savedData}: MainPopProps) => {
 console.log(savedData)
  // api 연동 구간
  const {mutate:postArticle} = usePostArticle();
  const {mutate:postCategories} = usePostCategories();
  const {mutate:putArticle} = usePutArticle();
  const { data : categoryData } = useGetCategoriesExtension();
  const { data : remindData } = useGetRemindTime();

  const [isRemindOn, setIsRemindOn] = useState(false);
  const [memo, setMemo] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isArticleId, setIsArticleId] = useState(0);

const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(
  type === "edit" && savedData?.categoryResponse?.categoryName
    ? savedData?.categoryResponse?.categoryName
    : null
);

const [selected, setSelected] = useState<string | null>(
  type === "edit" && savedData?.categoryResponse?.categoryId
    ? savedData?.categoryResponse?.categoryId.toString()
    : null
);

interface Category {
    categoryId: number;
    categoryName: string;
    categoryColor:string;
  }
     
useEffect(() => {
  if (type === "edit" && savedData && categoryData?.data?.categories?.length) {
    setMemo(savedData.memo ?? "");
    setIsArticleId(savedData.id ?? 0);

    if (savedData.remindAt) {
      const [rawDate, rawTime] = savedData.remindAt.split("T");
      setDate(updateDate(rawDate));
      setTime(updateTime(rawTime));
      setIsRemindOn(true);
    }
    if (savedData.categoryResponse) {
      setSelected(savedData.categoryResponse?.categoryId.toString());
      setSelectedCategoryName(savedData.categoryResponse?.categoryName);
    }
  }
}, [type, savedData, categoryData?.data?.categories?.length]);

  // YYYY-MM-DD → YYYY.MM.DD
  const updateDate = (date: string) => {
    if (!date) return "";
    return date.replace(/-/g, ".");
  };

  // HH:mm:ss → HH:mm
  const updateTime = (time: string) => {
    if (!time) return "";
    return time.slice(0, 5);
  };

  const combineDateTime = (date: string, time: string) => {
  if (!date || !time) return null;

  const formattedDate = date.replace(/\./g, "-");
  const formattedTime = time.length === 5 ? `${time}:00` : time;

  return `${formattedDate}T${formattedTime}`;
};


  // 시간,날짜 검사 구간!
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  useEffect(() => {
    if (remindData?.data) {
        const newDate = updateDate(remindData.data.remindDate);
        const newTime = updateTime(remindData.data.remindTime);
        setDate(newDate);
        setTime(newTime);
    }
  }, [remindData]);
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

  const { url, title, description, imgUrl: initialImgUrl ,loading} = usePageMeta();
  const { save } = useSaveBookmark();
  const [imgUrl, setImgUrl] = useState(initialImgUrl);
    useEffect(() => {
    if (!loading && !title) {
        // alert("이 페이지는 저장할 수 없어요 😢");
        // window.close();
    }
    }, [loading, title]);

    // 이미지 없으면 기본 이미지로 교체
    useEffect(() => {
    if (!initialImgUrl) {
        setImgUrl("https://thumb.photo-ac.com/31/3137071c02f608edb5220129b10533d6_t.jpeg");
    } else {
        setImgUrl(initialImgUrl);
    }
    }, [initialImgUrl]);
  // useEffect(()=>{
  //   postSignup({
  //       "email": "test@gmail2.com", 
  //       "remindDefault": "08:00", 
  //       "fcmToken": "adlfdjlaj11212lkadfsjlkfdsa"
  //     })
  // },[])
const options = categoryData?.data?.categories?.map((c: Category) => c.categoryName) ?? [];

  const handleSave = async () => {
     if (!selected || parseInt(selected) === 0) {
        alert("카테고리를 선택해주세요!");
        return;
    }
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

   if (type === "add"){
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
     postArticle(
      {
        url,
        categoryId: saveData.selectedCategory
          ? parseInt(saveData.selectedCategory)
          : 0,
        memo: saveData.memo,
        remindTime: combineDateTime(saveData.date ?? "", saveData.time ?? ""),
      }
    );
   } else{
        putArticle({
        articleId: isArticleId,
        data: { 
            categoryId: saveData.selectedCategory
            ? parseInt(saveData.selectedCategory)
            : 0,
            memo: saveData.memo,
            now: new Date().toISOString(),
            remindTime: combineDateTime(saveData.date ?? "", saveData.time ?? ""),
      }

    });
   }
   
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
    const categoryId = categoryData?.data?.categories[idx]?.categoryId.toString() ?? null;
    setSelected(categoryId);
    setSelectedCategoryName(value);
  };

//   if (!selectedCategoryName){
//     return <div className="App">카테고리 로딩중...</div>;
//   }
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
            title={title || '제목 로딩 중...'}
            source={description || '불러오는 중입니다'}
            imgUrl={imgUrl}
          />

          <div>
            <p className="caption1-sb mb-[0.4rem]">카테고리</p>
            <Dropdown
              options={options}
              selectedValue={selectedCategoryName}
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
              value ={memo}
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
                key={`date-${date}`} 
                state={
                  dateError ? 'error' : isRemindOn ? 'default' : 'disabled'
                }
                value={date}
                onChange={handleDateChange}
              />
              <DateTime
                type="time"
                key={`time-${time}`} 
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

export default MainPop;
