import MyBookmarkCard from './MyBookmarkCard';
import RemindCard from './RemindCard';

type BaseProps = {
  title: string;
  content?: string;
  category?: string;
  categoryColor?: string;
  imageUrl?: string;
  onClick?: () => void;
  onOptionsClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

type RemindProps = BaseProps & {
  type: 'remind';
  timeRemaining: string;
  date?: never;
};

type BookmarkProps = BaseProps & {
  type: 'bookmark';
  date: string;
  timeRemaining?: never;
};

export type CardProps = RemindProps | BookmarkProps;

const Card = (
  props: CardProps & {
    onOptionsClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  }
) => {
  const { type, onOptionsClick } = props;

  return (
    <>
      {type === 'remind' && (
        <RemindCard {...props} onOptionsClick={onOptionsClick} />
      )}

      {type === 'bookmark' && (
        <MyBookmarkCard {...props} onOptionsClick={onOptionsClick} />
      )}
    </>
  );
};

export default Card;
