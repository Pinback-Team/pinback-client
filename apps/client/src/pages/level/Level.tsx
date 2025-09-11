import { Icon } from '@pinback/design-system/icons';
import { cn } from '@pinback/design-system/utils';
import LevelScene from '@pages/level/components/LevelScene';
import LevelInfoCard from '@pages/level/components/LevelInfoCard';
import TreeStatusCard from '@pages/level/components/TreeStatusCard';
import { getTreeLevel } from '@shared/utils/treeLevel';
import { TreeLevel } from '@pages/level/types/treeLevelType';
import { Badge } from '@pinback/design-system/ui';

export default function Level() {
  const acorns = 1; // TODO: API 연결되면 교체
  const info = getTreeLevel(acorns);

  return (
    <div className={cn('bg-subcolor mx-auto h-dvh w-full overflow-hidden')}>
      <div className="relative h-full w-full overflow-hidden rounded-[1.2rem]">
        <LevelScene level={info.level as TreeLevel} />

        <div className="absolute inset-0">
          <div className="flex flex-col items-start gap-[2rem] px-[8rem] py-[5.2rem]">
            <div className="flex flex-row items-center gap-[0.8rem]">
              <h1 className="head3 text-font-black-1">치삐의 지식나무 숲</h1>
              <div className="relative items-center">
                <button
                  type="button"
                  className="peer flex items-center justify-center p-[0.4rem]"
                  aria-describedby="level-info-card"
                >
                  <Icon name="ic_info" width={20} height={20} />
                </button>
                <div
                  id="level-info-card"
                  className={cn(
                    'pointer-events-none absolute left-0 top-[3rem] z-[20]',
                    'opacity-0 transition-opacity duration-150',
                    'peer-hover:pointer-events-auto peer-focus-visible:pointer-events-auto',
                    'peer-hover:opacity-100 peer-focus-visible:opacity-100'
                  )}
                >
                  <LevelInfoCard />
                </div>
              </div>
            </div>

            <Badge text="오늘 모은 도토리 개수" countNum={acorns} isActive={true} />
            <div className="flex">
              <TreeStatusCard acorns={acorns} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
