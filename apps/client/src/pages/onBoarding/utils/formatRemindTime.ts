export function normalizeTime(input: string): string {
  let hours = 0;
  let minutes = 0;

  const ampmMatch = input.match(/(AM|PM)\s?(\d{1,2}):(\d{1,2})/i);
  if (ampmMatch) {
    const [, ampm, h, m] = ampmMatch;
    hours = parseInt(h, 10);
    minutes = parseInt(m, 10);

    if (ampm.toUpperCase() === "PM" && hours < 12) {
      hours += 12;
    }
    if (ampm.toUpperCase() === "AM" && hours === 12) {
      hours = 0; // 12 AM → 00시
    }
  } else {
    const [h, m] = input.split(":");
    hours = parseInt(h, 10);
    minutes = parseInt(m, 10);
  }

  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  return `${hh}:${mm}`;
}