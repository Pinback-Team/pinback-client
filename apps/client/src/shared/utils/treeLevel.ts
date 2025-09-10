import {
  TREE_LEVEL_TABLE,
  TreeLevelResult,
  TreeLevelRow,
} from '@pages/level/types/treeLevelType';

function findLevelRow(count: number, rows: readonly TreeLevelRow[]) {
  const idx = rows.findIndex(
    (r) => count >= r.min && (r.max === undefined || count <= r.max)
  );
  const i = idx === -1 ? 0 : idx;
  return { row: rows[i], next: rows[i + 1] as TreeLevelRow | undefined };
}

function calcProgress(count: number, row: TreeLevelRow, next?: TreeLevelRow) {
  if (!next)
    return {
      progressToNext: 1 as const,
      nextMin: undefined,
      remainingToNext: undefined,
    };
  const span = Math.max(1, next.min - row.min);
  const progressToNext = Math.min(1, (count - row.min) / span);
  const remainingToNext = Math.max(0, next.min - count);
  return { progressToNext, nextMin: next.min, remainingToNext };
}

export function getTreeLevel(acorns: number): TreeLevelResult {
  const { row, next } = findLevelRow(acorns, TREE_LEVEL_TABLE);
  return { ...row, ...calcProgress(acorns, row, next) };
}

export { TREE_LEVEL_TABLE };
