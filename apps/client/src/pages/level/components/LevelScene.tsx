import { cn } from '@pinback/design-system/utils';
import { TreeLevel } from '@pages/level/types/treeLevelType';
import { HTMLAttributes } from 'react';

import chippi_level1 from '../../../assets/chippi_level1.png';
import chippi_level2 from '../../../assets/chippi_level2.png';
import chippi_level3 from '../../../assets/chippi_level3.png';
import chippi_level4 from '../../../assets/chippi_level4.png';
import chippi_level5 from '../../../assets/chippi_level5.png';

// import chippi_level1 from '../../../assets/Lv.1.png';
// import chippi_level2 from '../../../assets/Lv.2.png';
// import chippi_level3 from '../../../assets/Lv.3.png';
// import chippi_level4 from '../../../assets/Lv.4.png';
// import chippi_level5 from '../../../assets/Lv.5.png';

const SCENE_BY_LEVEL: Record<TreeLevel, string> = {
  1: chippi_level1,
  2: chippi_level2,
  3: chippi_level3,
  4: chippi_level4,
  5: chippi_level5,
} as const;

interface LevelSceneProps extends HTMLAttributes<HTMLDivElement> {
  level: TreeLevel;
}

export default function LevelScene({ level, className }: LevelSceneProps) {
  const src = SCENE_BY_LEVEL[level];
  return (
    <div className={cn('absolute inset-0', className)} aria-hidden="true">
      <img
        src={src}
        draggable={false}
        className="pointer-events-none h-full w-full select-none rounded-[1.2rem] object-contain object-[right_bottom]"
      />
    </div>
  );
}
