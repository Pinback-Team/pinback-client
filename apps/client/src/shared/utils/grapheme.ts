const _seg =
  typeof Intl !== 'undefined' && Intl.Segmenter
    ? new Intl.Segmenter('ko', { granularity: 'grapheme' })
    : null;

export const graphemeLength = (s: string) =>
  _seg ? Array.from(_seg.segment(s)).length : Array.from(s).length;
