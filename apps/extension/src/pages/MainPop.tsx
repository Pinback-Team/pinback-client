import {
  useGetCategoriesExtension,
  useGetRemindTime,
  usePostArticle,
  usePutArticle,
} from '@apis/query/queries';
import thumbImg from '@assets/extension_thumb.svg';
import { useCategoryManager } from '@hooks/useCategoryManager';
import { usePageMeta } from '@hooks/usePageMeta';
import { useSaveBookmark } from '@hooks/useSaveBookmarks';
import { Icon } from '@pinback/design-system/icons';
import {
  AutoDismissToast,
  Button,
  DateTime,
  Dropdown,
  InfoBox,
  PopupContainer,
  Switch,
  Textarea,
  Toast,
  validateDate,
  validateTime,
} from '@pinback/design-system/ui';
import { ArticleResponse } from '@shared-types/types';
import Header from '@shared/components/Header';
import {
  combineDateTime,
  updateDate,
  updateTime,
} from '@utils/remindTimeFormat';
import { useEffect, useState } from 'react';
interface MainPopProps {
  type: 'add' | 'edit';
  savedData?: ArticleResponse | null;
}
const MainPop = ({ type, savedData }: MainPopProps) => {
  // api 연동 구간
  const { mutate: postArticle } = usePostArticle();
  const { mutate: putArticle } = usePutArticle();
  const remindData = useGetRemindTime();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');

  const { data: categoryData, refetch } = useGetCategoriesExtension({
    enabled: false,
  });
  useEffect(() => {
    if (type === 'add' && remindData?.data) {
      const newDate = updateDate(remindData.data.data.remindDate);
      const newTime = updateTime(remindData.data.data.remindTime);
      setDate(newDate);
      setTime(newTime);
    }
  }, [remindData?.data, type]);

  // 저장 도메인 메타 데이터 갖고 오는 구간!
  const {
    url,
    title,
    description,
    imgUrl: initialImgUrl,
    loading,
  } = usePageMeta();
  const { save } = useSaveBookmark();
  const [imgUrl, setImgUrl] = useState(initialImgUrl);

  useEffect(() => {
    if (!loading && !title) {
      alert('이 페이지는 저장할 수 없어요 🐿️');
      window.close();
    }
  }, [loading, title]);

  // 이미지 없으면 기본 이미지로 교체
  const defaultImageUrl = thumbImg;

  useEffect(() => {
    if (!initialImgUrl) {
      setImgUrl(defaultImageUrl);
    } else {
      setImgUrl(initialImgUrl);
    }
  }, [initialImgUrl]);

  // 아티클 팝업 정보들 상태
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [isRemindOn, setIsRemindOn] = useState(true);
  const [memo, setMemo] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isArticleId, setIsArticleId] = useState(0);
  const [selectedCategoryName, setSelectedCategoryName] = useState<
    string | null
  >(
    type === 'edit' && savedData?.categoryResponse?.categoryName
      ? savedData?.categoryResponse?.categoryName
      : null
  );
  const [selected, setSelected] = useState<string | null>(
    type === 'edit' && savedData?.categoryResponse?.categoryId
      ? savedData?.categoryResponse?.categoryId.toString()
      : null
  );

  // 타입 (수정상태인지 초기 저장인지! 에 따라서 ui 화면 데이터 보여줄 지 분기!)
  useEffect(() => {
    console.log(
      'savedData?.categoryResponse?.categoryName',
      savedData?.categoryResponse?.categoryName
    );
    console.log(savedData);
    if (
      type === 'edit' &&
      savedData &&
      categoryData?.data?.categories?.length
    ) {
      console.log('edit 모드입니다.');
      setMemo(savedData.memo ?? '');
      setIsArticleId(savedData.articleId ?? 0);

      if (savedData.remindAt) {
        const [rawDate, rawTime] = savedData.remindAt.split('T');
        setDate(updateDate(rawDate));
        setTime(updateTime(rawTime));
        setIsRemindOn(true);
      } else {
        setIsRemindOn(false);
      }

      if (savedData.categoryResponse) {
        setSelected(savedData.categoryResponse.categoryId.toString());
        setSelectedCategoryName(savedData.categoryResponse.categoryName);
      }
    }
  }, [type, savedData, categoryData?.data?.categories?.length]);

  // [카테고리 설정 구간] 이거는 훅으로 빼긴 했는데, 카테고리 추가나 드롭다운 수정하는 구간임!!
  const {
    options,
    categoryTitle,
    setCategoryTitle,
    isPublic,
    setIsPublic,
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
  };

  const handleSelect = (value: string | null, idx: number) => {
    const categoryId =
      categoryData?.data?.categories[idx]?.categoryId.toString() ?? null;
    setSelected(categoryId);
    setSelectedCategoryName(value);
  };

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
  function getKSTISOString() {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000; // UTC 기준 오프셋 (분 단위)
    const kst = new Date(now.getTime() - offset); // UTC → KST 보정
    return kst.toISOString().slice(0, 19); // 밀리초, Z 제거
  }
  // 마지막! 저장하기 버튼 분기 (api 다르게 탐)
  const handleSave = async () => {
    const currentDate = date;
    const currentTime = time;
    if (!selected || parseInt(selected) === 0) {
      alert('카테고리를 선택해주세요!');
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
      date: isRemindOn ? currentDate : date,
      time: isRemindOn ? currentTime : time,
      createdAt: getKSTISOString(),
    };

    if (type === 'add') {
      postArticle(
        {
          url,
          categoryId: saveData.selectedCategory
            ? parseInt(saveData.selectedCategory)
            : 0,
          memo: saveData.memo,
          remindTime: isRemindOn
            ? combineDateTime(saveData.date ?? '', saveData.time ?? '')
            : null,
        },
        {
          onSuccess: () => {
            save({
              url,
              title,
              description,
              imgUrl,
              memo,
              isRemindOn,
              selectedCategory: selected,
              date: isRemindOn ? currentDate : date,
              time: isRemindOn ? currentTime : time,
            });
          },
        }
      );
    } else {
      setToastIsOpen(true);
      putArticle(
        {
          articleId: isArticleId,
          data: {
            categoryId: saveData.selectedCategory
              ? parseInt(saveData.selectedCategory)
              : 0,
            memo: saveData.memo,
            now: getKSTISOString(),
            remindTime: isRemindOn
              ? combineDateTime(saveData.date ?? '', saveData.time ?? '')
              : null,
          },
        },
        {
          onSuccess: () => {
            window.close();
          },
        }
      );
    }
  };

  return (
    <div className="App">
      <div className="relative flex h-[56.8rem] w-[31.2rem] items-center justify-center">
        {toastIsOpen && (
          <div className="absolute bottom-[5rem] left-1/2 -translate-x-1/2">
            <AutoDismissToast
              duration={1000}
              fadeMs={1000}
              onClose={() => setToastIsOpen(false)}
            >
              <Toast text={`수정내용을 저장했어요`}>
                <Icon name="check_circle" size={20} />
              </Toast>
            </AutoDismissToast>
          </div>
        )}
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
              resetPopup();
            }}
            onRightClick={saveHandleCategory}
            checkboxOption={{
              label: '같은 관심 직무 사용자들에게 공유하기',
              isSelected: isPublic,
              onSelectedChange: setIsPublic,
            }}
          />
        )}

        <div className="flex flex-col justify-between gap-[1.6rem] rounded-[12px] bg-white px-[3.2rem] py-[2.4rem] text-black">
          <Header />
          {loading ? (
            <div className="bg-gray100 h-[6.8rem] w-[full] animate-pulse rounded-[4px]" />
          ) : (
            <InfoBox
              title={title}
              source={description}
              imgUrl={initialImgUrl || defaultImageUrl}
            />
          )}

          <div>
            <p className="caption1-sb mb-[0.4rem]">카테고리</p>
            <Dropdown
              options={options}
              selectedValue={selectedCategoryName}
              onChange={handleSelect}
              placeholder="선택해주세요"
              onAddItem={() => setIsPopupOpen(true)}
              limit={10}
              addItemLabel="추가하기"
              onToggle={(open) => {
                if (open) {
                  refetch();
                }
              }}
            />
          </div>

          <div>
            <p className="caption1-sb mb-[0.4rem]">메모</p>
            <Textarea
              maxLength={500}
              placeholder="나중에 기억하기 쉽게 메모를 남겨주세요!"
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
            {dateError ? (
              <p className="body3-r text-error">{dateError}</p>
            ) : timeError ? (
              <p className="body3-r text-error">{timeError}</p>
            ) : null}
          </div>

          <Button
            size="medium"
            onClick={handleSave}
            disabled={isPopError || !!dateError || !!timeError}
          >
            저장
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainPop;
