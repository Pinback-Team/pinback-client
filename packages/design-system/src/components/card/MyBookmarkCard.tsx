import chippiNoImage from '../../assets/chippi_no_image.svg';
import { Icon } from '../../icons';
import Chip, { ChipColor } from '../chip/Chip';

import BaseCard from './BaseCard';

interface MyBookmarkCardProps {
  title: string;
  content?: string;
  category?: string;
  categoryColor?: string;
  imageUrl?: string;
  variant?: 'default' | 'save';
  date?: string;
  nickname?: string;
  onClick?: () => void;
  onOptionsClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const MyBookmarkCard = ({
  title,
  content,
  category,
  categoryColor,
  imageUrl,
  variant = 'default',
  date,
  nickname,
  onClick,
  onOptionsClick,
}: MyBookmarkCardProps) => {
  const displayNickname =
    nickname && nickname.trim().length > 0 ? nickname : '도토리';

  return (
    <BaseCard onClick={onClick} className="h-[33.8rem]">
      <div className="flex h-[12rem] w-full items-center justify-center overflow-hidden bg-[#F8F8FA]">
        {imageUrl ? (
          <img src={imageUrl} className="h-full w-full object-cover" />
        ) : (
          <img
            src={chippiNoImage}
            alt="이미지 없을 경우 logo"
            className="h-[12rem]"
          />
        )}
      </div>

      <div className="px-[1.6rem] py-[2.4rem]">
        <div className="mb-[0.8rem] flex h-[5.6rem] justify-between gap-[0.8rem]">
          <h3 className="head6 line-clamp-2">{title}</h3>
          {variant !== 'save' && (
            <button
              type="button"
              aria-label="카테고리 상세"
              className="cursor-pointer self-start"
              onClick={(e) => {
                e.stopPropagation();
                onOptionsClick?.(e);
              }}
            >
              <Icon name="ic_details_category" />
            </button>
          )}
        </div>

        <p className="body3-r text-font-gray-2 mb-[1.2rem] line-clamp-2 h-[4.2rem]">
          {content}
        </p>

        {category && categoryColor && (
          <Chip category={category} color={categoryColor as ChipColor} />
        )}

        {variant === 'save' ? (
          <div className="mt-[1.2rem] flex items-center justify-between">
            <p className="caption2-m text-font-ltgray-4">
              {`(${displayNickname})님의 핀`}
            </p>
            <Icon name="ic_memo" size={24} className="shrink-0" />
          </div>
        ) : (
          <p className="caption2-m text-font-ltgray-4 mt-[1.2rem]">{date}</p>
        )}
      </div>
    </BaseCard>
  );
};

export default MyBookmarkCard;
