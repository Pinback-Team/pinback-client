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
import { cn } from '@pinback/design-system/utils';
import {
  useGetDashboardCategories,
  usePutEditArticle,
} from '@shared/apis/queries';
import { usePageMeta } from '@shared/hooks/usePageMeta';
import { ArticleDetailResponse, EditArticleRequest } from '@shared/types/api';
import { buildUtcIso } from '@shared/utils/datetime';
import { updateDate, updateTime } from '@shared/utils/formatDateTime';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export interface CardEditModalProps {
  onClose: () => void;
  prevData: ArticleDetailResponse;
}

export default function CardEditModal({
  onClose,
  prevData,
}: CardEditModalProps) {
  const { meta } = usePageMeta(prevData.url);
  const { data: category } = useGetDashboardCategories();
  const { mutate: editArticle } = usePutEditArticle();
  const queryClient = useQueryClient();

  const [isRemindOn, setIsRemindOn] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 입력 필드 상태: 서버에서 받아올 데이터
  const [memo, setMemo] = useState('');
  const [categoryTitle, setCategoryTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');

  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [isPopError, setIsPopError] = useState(false);
  const [errorTxt, setErrorTxt] = useState('');

  const saveCategory = () => {
    if (categoryTitle.length > 20) {
      setIsPopError(true);
      setErrorTxt('20자 이내로 작성해주세요');
    } else {
      setIsPopupOpen(false);
    }
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

  const saveData = () => {
    if (!prevData?.id) {
      console.error('Article ID is missing, cannot save.');
      setToastIsOpen(true);
      return;
    }

    const remindTime =
      isRemindOn && date && time ? buildUtcIso(date, time) : null;

    const editArticleData: EditArticleRequest = {
      memo,
      categoryId:
        category?.categories.find((cat) => cat.name === selectedCategory)?.id ??
        -1,
      now: new Date().toISOString(),
      remindTime,
    };

    editArticle(
      {
        articleId: prevData?.id,
        editArticleData,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['remindArticles'],
          });
          queryClient.invalidateQueries({
            queryKey: ['bookmarkReadArticles'],
          });
          queryClient.invalidateQueries({
            queryKey: ['bookmarkUnreadArticles'],
          });
          queryClient.invalidateQueries({
            queryKey: ['categoryBookmarkArticles'],
          });
          onClose();
        },
        onError: () => {
          setToastIsOpen(true);
        },
      }
    );
  };

  useEffect(() => {
    if (prevData) {
      setMemo(prevData.memo || '');
      setSelectedCategory(prevData.categoryResponse.categoryName || null);

      if (prevData.remindAt) {
        const [rawDate, rawTime] = prevData.remindAt.split('T');
        setDate(updateDate(rawDate));
        setTime(updateTime(rawTime));
        setIsRemindOn(true);
      }
    }
  }, [prevData]);

  return (
    <div className="flex flex-col">
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'w-[31.2rem] rounded-[1.2rem] bg-white px-[3.2rem] py-[2.4rem] shadow-xl',
          'flex flex-col gap-[1.6rem]'
        )}
      >
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
        <header className="flex items-center justify-between">
          <Icon name="logo" width={72} height={20} />
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="rounded-[0.6rem] p-[0.4rem] hover:bg-gray-100"
          >
            <Icon name="ic_close" size={20} />
          </button>
        </header>

        <InfoBox
          title={meta.title}
          source={meta.description}
          imgUrl={meta.imgUrl}
        />

        <section className="flex flex-col gap-[0.8rem]">
          <p className="caption1-sb text-font-black-1">카테고리</p>
          <Dropdown
            options={
              category?.categories.map((category) => category.name) || []
            }
            selectedValue={selectedCategory}
            onChange={(value) => setSelectedCategory(value)}
            placeholder="선택해주세요"
            addItemLabel="추가하기"
          />
        </section>

        <section className="flex flex-col gap-[0.8rem]">
          <p className="caption1-sb text-font-black-1">메모</p>
          <Textarea
            placeholder="나중에 내가 꺼내줄 수 있게 살짝 적어줘!"
            maxLength={500}
            className="h-[12rem]"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </section>

        <section className="flex flex-col gap-[1.2rem]">
          <div className="flex items-center justify-between">
            <p className="caption1-sb text-font-black-1">리마인드</p>
            <Switch checked={isRemindOn} onCheckedChange={handleSwitchChange} />
          </div>

          <div className="flex justify-between gap-[0.8rem]">
            <DateTime
              type="date"
              state={dateError ? 'error' : isRemindOn ? 'default' : 'disabled'}
              value={date}
              onChange={handleDateChange}
            />
            <DateTime
              type="time"
              state={timeError ? 'error' : isRemindOn ? 'default' : 'disabled'}
              value={time}
              onChange={handleTimeChange}
            />
          </div>

          {dateError && <p className="body3-r text-error">{dateError}</p>}
          {timeError && <p className="body3-r text-error">{timeError}</p>}
        </section>
        {/* TODO: onClick 추후  저장 api 연결후 실패/성공 연결 */}
        <Button onClick={saveData}>저장하기</Button>
      </div>
      {toastIsOpen && (
        <div className="absolute bottom-[2.4rem] left-1/2 -translate-x-1/2">
          <AutoDismissToast
            duration={1000}
            fadeMs={1000}
            onClose={() => setToastIsOpen(false)}
          >
            <Toast text={`저장에 실패했어요.\n다시 시도해주세요`} />
          </AutoDismissToast>
        </div>
      )}
    </div>
  );
}
