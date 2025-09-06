import { Icon } from '@pinback/design-system/icons';
import { cn } from '@pinback/design-system/utils';
import LevelScene from './components/LevelScene';
import LevelInfoCard from './components/LevelInfoCard';
import TreeStatusCard from './components/TreeStatusCard';
import { getTreeLevel, type TreeLevel } from './utils/treeLevel';

interface LevelPageProps {
  acorns: number;
}

export default function Level({ acorns = 3 }: LevelPageProps) {
  const info = getTreeLevel(acorns);

  return (
    <div className={cn('bg-subcolor mx-auto w-full max-w-[96rem] p-[1.6rem]')}>
      <div className="relative overflow-hidden rounded-[1.2rem]">
        <LevelScene level={info.level as TreeLevel} />

        <div className="absolute inset-0">
          <div className="flex flex-col items-start gap-[2.4rem] p-[1.6rem]">
            <div className="flex flex-row">
              <h1 className="sub2-sb text-font-black-1">치삐의 지식나무 숲</h1>

              <div className="relative">
                <button
                  type="button"
                  className="peer rounded-[0.4rem] p-[0.4rem] outline-none focus-visible:ring-2"
                  aria-describedby="level-info-card"
                >
                  <Icon name="ic_info" width={20} height={20} />
                </button>
                <div
                  id="level-info-card"
                  className={cn(
                    'pointer-events-auto absolute left-0 top-[2.4rem] z-[20]',
                    'opacity-0 transition-opacity duration-150',
                    'peer-hover:opacity-100 peer-focus-visible:opacity-100'
                  )}
                >
                  <LevelInfoCard />
                </div>
              </div>
            </div>
            <div className="ml-[1.2rem] inline-flex items-center gap-[0.8rem]">
              <span className="caption2-m text-font-gray-2">
                오늘 모은 도토리 개수
              </span>
              <span className="sub5-sb bg-main0 text-main500 rounded-[0.4rem] px-[0.6rem] py-[0.2rem]">
                {acorns}
              </span>
            </div>
            <div className="flex">
              <TreeStatusCard acorns={acorns} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
