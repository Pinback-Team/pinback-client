function parseDateString(d: string) {
  const s = d.replace(/[^\d]/g, '');
  if (s.length !== 8) return null;
  const Y = Number(s.slice(0, 4));
  const M = Number(s.slice(4, 6));
  const D = Number(s.slice(6, 8));
  return { Y, M, D };
}

function parseTimeString(t: string) {
  const s = t.replace(/[^\d]/g, '');
  if (s.length !== 4) return null;
  const h = Number(s.slice(0, 2));
  const m = Number(s.slice(2, 4));
  return { h, m };
}

export function buildUtcIso(dateStr: string, timeStr: string) {
  const d = parseDateString(dateStr);
  const t = parseTimeString(timeStr);
  if (!d || !t) return null;

  const dt = new Date(d.Y, d.M - 1, d.D, t.h, t.m, 0, 0);
  return dt.toISOString();
}
