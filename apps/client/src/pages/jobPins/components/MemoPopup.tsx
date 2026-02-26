import { Icon } from '@pinback/design-system/icons';
import { Button } from '@pinback/design-system/ui';

interface MemoPopupProps {
  userName: string;
  memo?: string | null;
  onClose: () => void;
  onGoArticle: () => void;
}

export default function MemoPopup({
  userName,
  memo,
  onClose,
  onGoArticle,
}: MemoPopupProps) {
  const hasMemo = memo && memo.trim().length > 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60">
      <div className="w-[31.2rem] rounded-[1.2rem] bg-white px-[3.2rem] py-[2.4rem]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Icon name="logo" width={72} height={20} />
          <button onClick={onClose}>
            <Icon name="ic_close" size={20} />
          </button>
        </div>

        {/* Title */}
        <div className="caption1-sb text-font-black-1 mt-[1.6rem]">
          <span className="text-main500">{userName}</span>님의 메모
        </div>

        {/* Memo */}
        <div className="body3-r text-font-gray-3 mt-[1.2rem] h-[9.6rem] overflow-y-auto whitespace-pre-line">
          {hasMemo ? (
            memo
          ) : (
            <div className="text-gray-400">작성된 메모가 없어요.</div>
          )}
        </div>

        {/* Button */}
        <Button onClick={onGoArticle} className="mt-[2.4rem] w-full">
          아티클 보러 가기
        </Button>
      </div>
    </div>
  );
}
