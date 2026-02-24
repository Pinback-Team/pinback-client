import { cn } from '@pinback/design-system/utils';

interface FunnelProgressProps {
  currentIndex: number;
  totalSteps: number;
}

const FunnelProgress = ({ currentIndex, totalSteps }: FunnelProgressProps) => {
  const maxIndex = Math.max(1, totalSteps - 1);
  const percent = Math.max(0, Math.min(100, (currentIndex / maxIndex) * 100));

  return (
    <div className="relative flex h-[2rem] w-[26.9rem] items-center justify-center">
      <div className="bg-gray100 absolute left-[0.6rem] right-[0.6rem] top-1/2 h-[0.7rem] -translate-y-1/2 rounded-full">
        <div
          className="bg-main400 h-full rounded-full transition-[width] duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="relative z-10 flex w-full items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isActive = index <= currentIndex;
          return (
            <div
              key={`funnel-progress-${index}`}
              className={cn(
                'flex size-[2rem] items-center justify-center rounded-full text-[1.2rem] font-semibold leading-[1.5]',
                isActive
                  ? 'bg-main400 text-white'
                  : 'bg-gray100 text-font-ltgray-4'
              )}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FunnelProgress;
