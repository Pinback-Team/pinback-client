import { cn } from '../../lib';

interface BaseCardProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const BaseCard = ({ children, onClick, className }: BaseCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'border-gray200 w-[24.8rem] overflow-hidden rounded-[1.2rem] border bg-white',
        className
      )}
    >
      {children}
    </div>
  );
};

export default BaseCard;
