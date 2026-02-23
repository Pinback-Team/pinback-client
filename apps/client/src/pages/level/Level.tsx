import { Icon } from '@pinback/design-system/icons';
import { cn } from '@pinback/design-system/utils';
import LevelScene from '@pages/level/components/LevelScene';
import { getTreeLevel } from '@shared/utils/treeLevel';
import { TreeLevel } from '@pages/level/types/treeLevelType';
import { Badge } from '@pinback/design-system/ui';
import { useGetArcons } from '@shared/apis/queries';
import { lazy, Suspense } from 'react';
import { Balloon } from '@shared/components/balloon/Balloon';

const LevelInfoCard = lazy(
  () => import('@pages/level/components/LevelInfoCard')
);
const NextAcornTime = lazy(() => import('./components/NextAcornTime'));

export default function Level() {
  const { data, isPending, isError } = useGetArcons();

  if (isPending) return <div />;
  if (isError) return <div />;

  const acornCount = data.acornCount;
  const nextAcornTime = data.nextRemind;

  const info = getTreeLevel(acornCount);
  const isLevel5 = info.level === 5 || acornCount >= 7;

  const defaultLevel: TreeLevel = 1;
  const level = isPending ? defaultLevel : (info.level as TreeLevel);

  const balloonText =
    acornCount >= 7
      ? '도토리를 모두 모았어요!'
      : `다음 레벨까지 저장한 북마크 ${
          acornCount === 0 || acornCount % 2 === 0 ? 1 : 2
        }개 다시 읽기`;

  return (
    <div className={cn('bg-subcolor mx-auto h-dvh w-full overflow-hidden')}>
      <div className="relative h-full w-full overflow-hidden rounded-[1.2rem]">
        <LevelScene level={level} />

        <div className="absolute inset-0">
          <div className="flex flex-col items-start gap-[2rem] px-[8rem] py-[5.2rem]">
            <div className="flex flex-row items-center gap-[0.8rem]">
              <h1 className="head3 text-font-black-1">치삐의 지식나무 숲</h1>

              <div className="relative items-center">
                <button
                  type="button"
                  className="peer flex items-center justify-center gap-[4px] p-[0.4rem]"
                  aria-describedby="level-info-card"
                >
                  <Icon name="ic_info" width={20} height={20} />
                  <span className="body3-r text-font-gray-3">
                    치삐의 지식나무 숲, 어떻게하면 성장하나요?
                  </span>
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
                  <Suspense fallback={null}>
                    <LevelInfoCard />
                  </Suspense>
                </div>
              </div>
            </div>

            <div className="relative inline-block">
              <Badge
                text="오늘 모은 도토리 개수"
                countNum={acornCount}
                isActive={true}
              />

              <div className="absolute left-1/2 top-full z-[3] mt-[0.8rem] -translate-x-[53px]">
                <Balloon variant="gray" side="top">
                  <span className="caption1-m text-white">{balloonText}</span>
                </Balloon>
              </div>
            </div>
          </div>

          {isLevel5 && (
            <Suspense fallback={null}>
              <NextAcornTime
                className="absolute bottom-[5.2rem] left-1/2 z-[10] -translate-x-1/2"
                nextAcornTime={nextAcornTime}
              />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}
