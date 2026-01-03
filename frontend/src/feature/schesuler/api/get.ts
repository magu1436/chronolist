import { createNextDate } from "@/utils/date";
import CalendarEvent from "../entity/calendar-event"


export const getCalendarEvents = (start: string | Date, end: string | Date): CalendarEvent[] => {

    // テスト用のロジックを作成
    return ([
        new CalendarEvent(0, "ALL_DAY", new Date(), new Date(), "test", "red"),
        new CalendarEvent(1, "DATED", new Date(), createNextDate(new Date()), "test", "blue"),
    ]);
};