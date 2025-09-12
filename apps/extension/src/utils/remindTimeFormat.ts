  // YYYY-MM-DD → YYYY.MM.DD
  export const updateDate = (date: string) => {
    if (!date) return "";
    return date.replace(/-/g, ".");
  };

  // HH:mm:ss → HH:mm
  export const updateTime = (time: string) => {
    if (!time) return "";
    return time.slice(0, 5);
  };

    export const to24Hour = (time: string) => {
        // "오전 11:23" | "오후 11:23" 같은 문자열 들어온다고 가정
        const match = time.match(/(오전|오후)\s(\d{1,2}):(\d{2})/);
        if (!match) return time; // 포맷 안 맞으면 그대로 반환

        const [, period, hourStr, minute] = match;
        let hour = parseInt(hourStr, 10);

        if (period === "오전" && hour === 12) {
            hour = 0; // 오전 12시는 00시
        } else if (period === "오후" && hour !== 12) {
            hour += 12; // 오후 +12
        }

        return `${hour.toString().padStart(2, "0")}:${minute}`;
    };

    export const combineDateTime = (date: string, time: string) => {
        if (!date || !time) return null;

        const formattedDate = date.replace(/\./g, "-");
        const normalizedTime = to24Hour(time); // ✅ AM/PM 처리
        const formattedTime = normalizedTime.length === 5 ? `${normalizedTime}:00` : normalizedTime;

        return `${formattedDate}T${formattedTime}`;
    };
