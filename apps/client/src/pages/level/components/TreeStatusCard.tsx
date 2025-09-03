import { Level, Progress } from '@pinback/design-system/ui';
import { cn } from '@pinback/design-system/utils';
import { getTreeLevel } from '../utils/treeLevel';

export interface TreeStatusCardProps {
  acorns: number;
}

export default function TreeStatusCard({ acorns }: TreeStatusCardProps) {
  const info = getTreeLevel(acorns);

  const barPercent = Math.min(100, info.level * 20);

  return (
    <div
      className={cn('bg-white-bg w-[32.3rem] rounded-[1.2rem] p-[1.2rem]')}
      role="group"
      aria-label={`${info.name} 진행 카드`}
    >
      <div className="flex items-baseline">
        <span className="head1 text-main500">{barPercent}%</span>
      </div>

      <div className="mt-[0.8rem] flex items-center gap-[0.4rem]">
        <span className="sub4-sb text-font-gray-2">{info.name}</span>
        <Level level={info.level} />
      </div>

      <div className="mt-[1.6rem]">
        <Progress
          value={barPercent}
          variant="tree"
          aria-label={`${info.name} 레벨 진행률`}
        />
      </div>
    </div>
  );
}
