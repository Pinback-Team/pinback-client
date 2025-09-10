export type TreeLevelRowShape = {
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
