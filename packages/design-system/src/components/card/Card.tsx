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

type BookmarkDefaultProps = BaseProps & {
  type: 'bookmark';
  variant?: 'default';
  date: string;
  nickname?: never;
  timeRemaining?: never;
};

type BookmarkSaveProps = BaseProps & {
  type: 'bookmark';
  variant: 'save';
  nickname: string;
  date?: never;
  timeRemaining?: never;
};

export type CardProps = RemindProps | BookmarkDefaultProps | BookmarkSaveProps;

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
