import MyBookmarkCard from './MyBookmarkCard';
import RemindCard from './RemindCard';

type BaseProps = {
  title: string;
  content?: string;
  category?: string;
  imageUrl?: string;
  onClick?: () => void;
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

const Card = (props: CardProps) => {
  const { type } = props;

  return (
    <>
      {type === 'remind' && <RemindCard {...props} />}

      {type === 'bookmark' && <MyBookmarkCard {...props} />}
    </>
  );
};

export default Card;
