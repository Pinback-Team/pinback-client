import MyBookmarkCard from './MyBookmarkCard';
import RemindCard from './RemindCard';

interface CardProps {
  type: 'remind' | 'bookmark';
  title: string;
  content?: string;
  category: string;
  imageUrl?: string;
  timeRemaining?: string;
  date?: string;
}

const Card = ({
  type,
  title,
  content,
  category,
  imageUrl,
  timeRemaining,
  date,
}: CardProps) => {
  return (
    <>
      {type === 'remind' && (
        <RemindCard
          title={title}
          content={content}
          category={category}
          imageUrl={imageUrl}
          timeRemaining={timeRemaining}
        />
      )}

      {type === 'bookmark' && (
        <MyBookmarkCard
          title={title}
          content={content}
          category={category}
          imageUrl={imageUrl}
          date={date}
        />
      )}
    </>
  );
};

export default Card;
