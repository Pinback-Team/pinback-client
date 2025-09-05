// shared/utils/anchorPosition.ts
export function rightOf(anchor: HTMLElement, gap = 8) {
  const r = anchor.getBoundingClientRect();
  return { top: r.top, left: r.right + gap };
}
