export type TreeLevel = 1 | 2 | 3 | 4 | 5;

export interface TreeLevelRow {
  level: TreeLevel;
  name: string;
  min: number;
  max?: number;
  rangeLabel: string;
}

export const TREE_LEVEL_TABLE: readonly TreeLevelRow[] = [
  { level: 1, name: '잊힌 기록의 숲', min: 0, max: 0, rangeLabel: '0개' },
  { level: 2, name: '햇살의 터전', min: 1, max: 2, rangeLabel: '1–2개' },
  { level: 3, name: '기록의 오솔길', min: 3, max: 4, rangeLabel: '3–4개' },
  { level: 4, name: '지식 나무 언덕', min: 5, max: 6, rangeLabel: '5–6개' },
  { level: 5, name: '도토리 만개 숲', min: 7, rangeLabel: '7개 이상' },
] as const;

export interface TreeLevelResult extends TreeLevelRow {
  progressToNext: number;
  nextMin?: number;
  remainingToNext?: number;
}

export function getTreeLevel(acorns: number): TreeLevelResult {
  const count = Math.max(0, Math.floor(acorns ?? 0));

  const row =
    TREE_LEVEL_TABLE.find(
      (r) => count >= r.min && (r.max === undefined || count <= r.max)
    ) ?? TREE_LEVEL_TABLE[0];

  const idx = TREE_LEVEL_TABLE.findIndex((r) => r.level === row.level);
  const next = TREE_LEVEL_TABLE[idx + 1];

  if (!next) {
    return { ...row, progressToNext: 1 };
  }
  const span = Math.max(1, next.min - row.min);
  const progressToNext = Math.min(1, (count - row.min) / span);
  const remainingToNext = Math.max(0, next.min - count);

  return {
    ...row,
    progressToNext,
    nextMin: next.min,
    remainingToNext,
  };
}
