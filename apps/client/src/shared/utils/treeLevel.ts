type TreeLevelRowShape = {
  level: number;
  name: string;
  min: number;
  max?: number;
  rangeLabel: string;
};

export const TREE_LEVEL_TABLE = [
  { level: 1, name: '잊힌 기록의 숲', min: 0, max: 0, rangeLabel: '0개' },
  { level: 2, name: '햇살의 터전', min: 1, max: 2, rangeLabel: '1–2개' },
  { level: 3, name: '기록의 오솔길', min: 3, max: 4, rangeLabel: '3–4개' },
  { level: 4, name: '지식 나무 언덕', min: 5, max: 6, rangeLabel: '5–6개' },
  { level: 5, name: '도토리 만개 숲', min: 7, rangeLabel: '7개 이상' },
] as const satisfies readonly TreeLevelRowShape[];

export type TreeLevel = (typeof TREE_LEVEL_TABLE)[number]['level'];
export type TreeLevelRow = TreeLevelRowShape;

export type TreeLevelResult = TreeLevelRow & {
  progressToNext: number;
  nextMin?: number;
  remainingToNext?: number;
};

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
