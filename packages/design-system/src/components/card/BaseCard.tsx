interface BaseCardProps {
  children: React.ReactNode;
}

const BaseCard = ({ children }: BaseCardProps) => {
  return (
    <div className="outline-gray200 w-[24.8rem] overflow-hidden rounded-[1.2rem] bg-white outline">
      {children}
    </div>
  );
};

export default BaseCard;
