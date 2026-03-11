import { Icon } from '@pinback/design-system/icons';
import { cn } from '@pinback/design-system/utils';
import { useCountdown } from '@pages/level/hooks/useCountdown';

type NextAcornTimeProps = {
  className?: string;
  nextAcornTime: string;
};

export default function NextAcornTime({
  className,
  nextAcornTime,
}: NextAcornTimeProps) {
  const timeLeft = useCountdown(nextAcornTime);

  return (
    <div
      className={cn(
        'bg-gray900 inline-flex items-center gap-[0.8rem] rounded-[12px] px-[1.6rem] py-[1.2rem]',
        className
      )}
    >
      <Icon name="ic_clock_active" width={20} height={20} aria-hidden />
      <span className="body2-m text-white-bg whitespace-nowrap">
        도토리 다시 모을 수 있는 시간까지
      </span>
      <span className="body2-m text-main400 tabular-nums" aria-live="polite">
        {timeLeft} ✨
      </span>
    </div>
  );
}
