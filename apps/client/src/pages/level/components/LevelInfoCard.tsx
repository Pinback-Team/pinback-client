import { cn } from '@pinback/design-system/utils';
import { Level } from '@pinback/design-system/ui';
import { Icon, type IconName } from '@pinback/design-system/icons';
import { TREE_LEVEL_TABLE, type TreeLevel } from '@shared/utils/treeLevel';

const LEVEL_TOOLTIP_ICON = {
  1: 'tooltip_1',
  2: 'tooltip_2',
  3: 'tooltip_3',
  4: 'tooltip_4',
  5: 'tooltip_5',
} as const satisfies Record<TreeLevel, IconName>;

export default function LevelInfoCard() {
  const rows = [...TREE_LEVEL_TABLE].reverse();

  return (
    <section
      className={cn(
        'bg-white-bg common-shadow w-[24.6rem] rounded-[1.2rem] px-[1.6rem] py-[2.4rem]'
      )}
      aria-label="지식나무 숲 레벨 안내"
    >
      <h2 className="sub2-sb text-font-black-1 mb-[1.2rem] flex items-center justify-center">
        치삐의 지식나무 숲 레벨
      </h2>

      <ul>
        {rows.map((row) => (
          <li
            key={row.level}
            className="flex w-full items-center justify-between py-[1.2rem]"
          >
            <div className="flex w-full items-center gap-[1.2rem]">
              <div className="bg-gray0 flex h-[4.6rem] w-[4.6rem] items-center justify-center rounded-[0.8rem]">
                <Icon
                  name={LEVEL_TOOLTIP_ICON[row.level]}
                  width={46}
                  height={46}
                  className="rounded-[0.8rem]"
                  aria-label={`${row.level} 썸네일 아이콘`}
                />
              </div>

              <div className="ml-[0.8rem] flex flex-1 flex-col gap-[0.4rem]">
                <div className="flex justify-between">
                  <span className="sub5-sb text-font-black-1">{row.name}</span>
                  <Level level={row.level} aria-label={`레벨 ${row.level}`} />
                </div>

                <span className="caption2-m text-font-gray-3">
                  {row.rangeLabel}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="bg-gray0 mt-[0.8rem] rounded-[0.4rem] px-[0.8rem] py-[1.2rem]">
        <p className="caption2-m text-font-gray-3 flex items-center justify-center">
          정보를 1분 동안 읽고 도토리를 모아보세요. 치삐를 행복하게 만들 수
          있어요.
        </p>
      </div>
    </section>
  );
}
