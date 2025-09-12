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
import { usePageMeta } from '@hooks/usePageMeta';
import { useSaveBookmark } from '@hooks/useSaveBookmarks';
import { Icon } from '@pinback/design-system/icons';
import { usePostArticle,useGetCategoriesExtension, useGetRemindTime, usePutArticle} from '@apis/query/queries';
import { ArticleResponse} from '@shared-types/types'
import { updateDate, updateTime, combineDateTime } from '@utils/remindTimeFormat';
import { useCategoryManager } from '@hooks/useCategoryManager';
interface MainPopProps {
    type: "add" | "edit";
    savedData?: ArticleResponse  | null;
}
const MainPop = ({type, savedData}: MainPopProps) => {
  // api 연동 구간
  const {mutate:postArticle} = usePostArticle();
  const {mutate:putArticle} = usePutArticle();
  const { data : categoryData } = useGetCategoriesExtension();
  const remindDataRaw = useGetRemindTime();
  const remindData = type === "add" ? remindDataRaw : null;


  // 저장 도메인 메타 데이터 갖고 오는 구간!
  const { url, title, description, imgUrl: initialImgUrl ,loading} = usePageMeta();
  const { save } = useSaveBookmark();
  const [imgUrl, setImgUrl] = useState(initialImgUrl);

  
    useEffect(() => {
    if (!loading && !title) {
        // 개발 중에는 주석처리 (최종엔 주석 제거할거임)
        // alert("이 페이지는 저장할 수 없어요 🐿️");
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


  // 아티클 팝업 정보들 상태
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

  // 타입 (수정상태인지 초기 저장인지! 에 따라서 ui 화면 데이터 보여줄 지 분기!)
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

  // [카테고리 설정 구간] 이거는 훅으로 빼긴 했는데, 카테고리 추가나 드롭다운 수정하는 구간임!!
  const {
    options,
    categoryTitle,
    setCategoryTitle,
    isPopError,
    errorTxt,
    saveCategory,
    resetPopup,
  } = useCategoryManager();

  const saveHandleCategory = () => {
    saveCategory((newCategory) => {
          // 새로운 카테고리 자동 선택
          setSelected(newCategory.categoryId.toString());
          setSelectedCategoryName(newCategory.categoryName);
          setIsPopupOpen(false);
    });
  }

  const handleSelect = (value: string | null, idx: number) => {
    const categoryId = categoryData?.data?.categories[idx]?.categoryId.toString() ?? null;
    setSelected(categoryId);
    setSelectedCategoryName(value);
  };


  // 리마인드 시간,날짜 검사 구간! (포맷팅은 utils로 뻄!)
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  useEffect(() => {
    if (remindData?.data && type=='add') {
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

  const handleSwitchChange = (checked: boolean) => {
    setIsRemindOn(checked);
  };

  // 마지막! 저장하기 버튼 분기 (api 다르게 탐)
  const handleSave = async () => {
    const currentDate = date;
    const currentTime = time;
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
      date: isRemindOn ? currentDate  : date,
      time: isRemindOn ? currentTime : time,
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
      date: isRemindOn ? currentDate  : date,
      time: isRemindOn ? currentTime : time,
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
            onLeftClick={() => {
              setIsPopupOpen(false);
              resetPopup()
            }}
            onRightClick={saveHandleCategory}
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
