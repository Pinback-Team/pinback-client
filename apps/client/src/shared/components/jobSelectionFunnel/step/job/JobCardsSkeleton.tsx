interface JobCardsSkeletonProps {
  count?: number;
}

const JobCardsSkeleton = ({ count = 4 }: JobCardsSkeletonProps) => {
  return (
    <div className="grid w-full grid-cols-2 justify-items-center gap-[1.4rem] sm:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-gray100 h-[22.4rem] w-[18rem] animate-pulse rounded-[1.2rem]"
        />
      ))}
    </div>
  );
};

export default JobCardsSkeleton;
