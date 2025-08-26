import { Icon } from '@/icons';
import BaseCard from './BaseCard';

interface MyBookMarkProps {
  title: string;
  content?: string;
  category: string;
  imageUrl?: string;
  date?: string;
}

const MyBookMark = ({
  title,
  content,
  category,
  imageUrl,
  date,
}: MyBookMarkProps) => {
  return (
    <BaseCard>
      <div className="bg-gray200 h-[12rem] w-full overflow-hidden">
        <img src={imageUrl} className="h-full w-full object-cover" />
      </div>

      <div className="px-[1.6rem] py-[2.4rem]">
        <p className="body3-r text-font-gray-2 mb-[1.2rem] line-clamp-2">
          {content}
        </p>

        <div className="mb-[0.8rem] flex justify-between">
          <h3 className="head6 line-clamp-2">{title}</h3>
          <button type="button" className="cursor-pointer">
            <Icon name="ic_details_category" />
          </button>
        </div>

        {category && (
          <span className="bg-category-red-bg caption2-sb text-category-red-text h-[2.2rem] w-[6.2rem] rounded-[0.4rem] px-[0.8rem] py-[0.2rem]">
            {category}
          </span>
        )}

        <p className="caption2-m text-font-ltgray-4 mt-[1.2rem]">
          {date || '2025.08.09'}
        </p>
      </div>
    </BaseCard>
  );
};

export default MyBookMark;
