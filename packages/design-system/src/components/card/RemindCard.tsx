import { Icon } from '@/icons';
import chippiNoImage from '../../assets/chippi_no_image.svg';
import BaseCard from './BaseCard';

interface RemindCardProps {
  title: string;
  content?: string;
  category: string;
  imageUrl?: string;
  timeRemaining?: string;
}

const RemindCard = ({
  title,
  content,
  category,
  imageUrl,
  timeRemaining,
}: RemindCardProps) => {
  return (
    <BaseCard>
      <div className="bg-gray900 flex items-center gap-[0.4rem] py-[1.2rem] pl-[1.6rem] text-sm text-white">
        <Icon name="ic_clock_active" />
        <span className="body2-m text-main400 mr-[0.2rem]">
          {timeRemaining || '-'}
        </span>
        <span className="body2-m text-white-bg">이후에 사라져요</span>
      </div>

      <div className="bg-#F8F8FA flex h-[12rem] w-full items-center justify-center overflow-hidden">
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
          <button type="button" className="cursor-pointer self-start">
            <Icon name="ic_details_category" />
          </button>
        </div>
        <p className="body3-r text-font-gray-2 mb-[1.2rem] line-clamp-2 h-[4.2rem]">
          {content}
        </p>
        <span className="bg-category-red-bg caption2-sb text-category-red-text h-[2.2rem] w-[6.2rem] rounded-[0.4rem] px-[0.8rem] py-[0.2rem]">
          {category}
        </span>
      </div>
    </BaseCard>
  );
};

export default RemindCard;
