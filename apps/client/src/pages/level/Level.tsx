import { Icon } from '@pinback/design-system/icons';
import { cn } from '@pinback/design-system/utils';
import LevelScene from './components/LevelScene';
import LevelInfoCard from './components/LevelInfoCard';
import TreeStatusCard from './components/TreeStatusCard';
import { getTreeLevel, type TreeLevel } from './utils/treeLevel';
import { Badge } from '@pinback/design-system/ui';

interface LevelPageProps {
  acorns?: number;
}

export default function Level({ acorns = 3 }: LevelPageProps) {
  const info = getTreeLevel(acorns);

  return (
    <div className={cn('bg-subcolor mx-auto w-full max-w-[96rem]')}>
      <div className="relative overflow-hidden rounded-[1.2rem]">
        <LevelScene level={info.level as TreeLevel} />

        <div className="absolute inset-0">
          <div className="flex flex-col items-start gap-[2.4rem] px-[8rem] py-[5.2rem]">
            <div className="flex flex-row gap-[0.8rem]">
              <h1 className="sub2-sb text-font-black-1">치삐의 지식나무 숲</h1>

              <div className="relative">
                <button
                  type="button"
                  className="peer p-[0.4rem]"
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
            {/* TODO: 오늘 모은 도토리 개수 배지 */}
            <Badge text={'오늘 모은 도토리 개수'} countNum={acorns} />

            <div className="flex">
              <TreeStatusCard acorns={acorns} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
