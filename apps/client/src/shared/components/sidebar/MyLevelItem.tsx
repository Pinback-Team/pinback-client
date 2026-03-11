import { Icon } from '@pinback/design-system/icons';
import { Level, Progress } from '@pinback/design-system/ui';
import { cn } from '@pinback/design-system/utils';
import { getTreeLevel } from '@shared/utils/treeLevel';

interface MyLevelItemProps {
  acorns: number;
  className?: string;
  isActive: boolean;
  onClick: () => void;
}

export default function MyLevelItem({
  acorns,
  onClick,
  isActive: active,
}: MyLevelItemProps) {
  const info = getTreeLevel(acorns);

  const barPercent = Math.min(100, info.level * 20);

  return (
    <div
      onClick={onClick}
      className={cn(
        'h-[6.2rem] w-full rounded-[0.4rem] border p-[0.8rem] transition-colors',
        'flex flex-row justify-between gap-[0.8rem]',
        'bg-white-bg border-transparent',
        'hover:bg-main0 hover:border-main400',
        active && 'bg-main0 border-main400'
      )}
    >
      <div
        className="flex size-[4.6rem] items-center justify-center"
        aria-hidden
      >
        <Icon
          name="chippi_profile"
          width={46}
          height={46}
          className="rounded-[0.4rem]"
        />
      </div>

      <div className="flex w-full flex-col justify-between">
        <div className="flex items-center justify-between gap-2">
          <span className="sub5-sb text-font-gray-2">{info.name}</span>
          <Level level={info.level} />
        </div>

        <div className="w-full py-[0.7rem]">
          <Progress
            value={barPercent}
            variant="profile"
            aria-label={`${info.name} 레벨 진행률`}
          />
        </div>
      </div>
    </div>
  );
}
