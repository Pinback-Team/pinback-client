import chippiNoImage from '../../assets/chippi_no_image.svg';
import { Icon } from '../../icons';
import Chip, { ChipColor } from '../chip/Chip';
import BaseCard from './BaseCard';

interface RemindCardProps {
  title: string;
  content?: string;
  category?: string;
  categoryColor?: string;
  imageUrl?: string;
  timeRemaining: string;
  onClick?: () => void;
  onOptionsClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const RemindCard = ({
  title,
  content,
  category,
  categoryColor,
  imageUrl,
  // timeRemaining,
  onClick,
  onOptionsClick,
}: RemindCardProps) => {
  return (
    <BaseCard onClick={onClick} className="h-[35.6rem]">
      <div className="bg-gray900 flex items-center gap-[0.4rem] py-[1.2rem] pl-[1.6rem] text-sm text-white">
        <Icon name="ic_clock_active" />
        <span className="body2-m text-main400 mr-[0.2rem]">
          {/* {timeRemaining || '-'} */}-
        </span>
        <span className="body2-m text-white-bg">이후에 사라져요</span>
      </div>

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
        </div>
        <p className="body3-r text-font-gray-2 mb-[1.2rem] line-clamp-2 h-[4.2rem]">
          {content}
        </p>

        {category && categoryColor && (
          <Chip category={category} color={categoryColor as ChipColor} />
        )}
      </div>
    </BaseCard>
  );
};

export default RemindCard;
