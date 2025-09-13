interface BaseCardProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const BaseCard = ({ children, onClick }: BaseCardProps) => {
  return (
    <div
      onClick={onClick}
      className="border-gray200 w-[24.8rem] overflow-hidden rounded-[1.2rem] border bg-white"
    >
      {children}
    </div>
  );
};

export default BaseCard;
