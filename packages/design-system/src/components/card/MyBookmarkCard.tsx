import { Icon } from '@/icons';
import chippiNoImage from '../../assets/chippi_no_image.svg';
import BaseCard from './BaseCard';

interface MyBookmarkCardProps {
  title: string;
  content?: string;
  category?: string;
  imageUrl?: string;
  date: string;
}

const MyBookmarkCard = ({
  title,
  content,
  category,
  imageUrl,
  date,
}: MyBookmarkCardProps) => {
  return (
    <BaseCard>
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
          >
            <Icon name="ic_details_category" />
          </button>
        </div>

        <p className="body3-r text-font-gray-2 mb-[1.2rem] line-clamp-2 h-[4.2rem]">
          {content}
        </p>

        {/* TODO: 카테고리 컴포넌트로 교체 */}
        {category && (
          <span className="bg-category-red-bg caption2-sb text-category-red-text h-[2.2rem] w-[6.2rem] rounded-[0.4rem] px-[0.8rem] py-[0.2rem]">
            {category}
          </span>
        )}

        <p className="caption2-m text-font-ltgray-4 mt-[1.2rem]">{date}</p>
      </div>
    </BaseCard>
  );
};

export default MyBookmarkCard;
