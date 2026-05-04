import { nextDate } from "@/utils/date";
import CalendarEvent from "../entity/calendarEvent";


export const getCalendarEvents = (start: string | Date, end: string | Date): CalendarEvent[] => {

    // テスト用のロジックを作成
    return ([
        new CalendarEvent(0, "ALL_DAY", new Date(), new Date(), "test", "RED"),
        new CalendarEvent(1, "DATED", new Date(), nextDate(new Date()), "test", "BLUE"),
    ]);
};