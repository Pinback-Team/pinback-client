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
        const match = time.match(/(오전|오후)\s(\d{1,2}):(\d{2})/);
        if (!match) return time;

        const [, period, hourStr, minute] = match;
        let hour = parseInt(hourStr, 10);

        if (period === "오전" && hour === 12) {
            hour = 0; 
        } else if (period === "오후" && hour !== 12) {
            hour += 12; 
        }

        return `${hour.toString().padStart(2, "0")}:${minute}`;
    };

    export const combineDateTime = (date: string, time: string) => {
        if (!date || !time) return null;

        const formattedDate = date.replace(/\./g, "-");
        const normalizedTime = to24Hour(time); 
        const formattedTime = normalizedTime.length === 5 ? `${normalizedTime}:00` : normalizedTime;

        return `${formattedDate}T${formattedTime}`;
    };
