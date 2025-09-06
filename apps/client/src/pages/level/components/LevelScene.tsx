// components/LevelScene.tsx
import * as React from 'react';
import { cn } from '@pinback/design-system/utils';
import { type TreeLevel } from '../utils/treeLevel';

import chippi_level1 from '../../../assets/chippi_level1.png';
import chippi_level2 from '../../../assets/chippi_level2.png';
import chippi_level3 from '../../../assets/chippi_level3.png';
import chippi_level4 from '../../../assets/chippi_level4.png';
import chippi_level5 from '../../../assets/chippi_level5.png';

const SCENE_BY_LEVEL: Record<TreeLevel, string> = {
  1: chippi_level1,
  2: chippi_level2,
  3: chippi_level3,
  4: chippi_level4,
  5: chippi_level5,
} as const;

interface LevelSceneProps extends React.HTMLAttributes<HTMLDivElement> {
  level: TreeLevel;
}

export default function LevelScene({
  level,
  className,
  ...rest
}: LevelSceneProps) {
  const src = SCENE_BY_LEVEL[level];
  return (
    <div className={cn('relative w-full', className)} {...rest}>
      <img
        src={src}
        alt={`지식나무 숲 Lv.${level}`}
        className="h-auto w-full select-none rounded-[1.2rem] object-cover"
        draggable={false}
      />
    </div>
  );
}
