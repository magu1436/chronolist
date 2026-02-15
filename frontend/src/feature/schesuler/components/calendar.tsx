import FullCalendar from "@fullcalendar/react";
import type { EventClickArg, DatesSetArg, EventContentArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useCallback, useContext } from "react";

import CalendarEventsContext from "./contexts/calendar-events-context";
import SelectedCalendarEventContext from "./contexts/selected-event";
import { getCalendarEvents } from "../api/get";
import { prevDate } from "@/utils/date";
import { formattedTime } from "@/utils/time";

const Calendar = () => {
    const { events, setEvents } = useContext(CalendarEventsContext);
    const { setEventId: setSelectedEventId } = useContext(SelectedCalendarEventContext);

    // 初期化時や月変更時に呼び出される関数
    const handleDatesSet = useCallback((arg: DatesSetArg) => {
        const start = arg.start;
        const end = prevDate(arg.end);
        setEvents(getCalendarEvents(start, end));

        // テスト出力
        console.log("handleDatesSet");
        console.log(start, end);
        console.log(events);

    }, []);

    // イベントラベル選択時に呼び出される関数
    const handleEventClick = useCallback((arg: EventClickArg) => {
        const clickedEventId = Number(arg.event.id);
        if (events.find(e => e.id === clickedEventId) === undefined) {
            throw new Error("Event not found.");
        };

        setSelectedEventId(clickedEventId || null);

        // テスト出力
        console.log("handleEventClick");
        console.log(clickedEventId);

    }, [setSelectedEventId]);

    // イベントラベル表示時に呼び出される関数
    const handleEventContent = useCallback((arg: EventContentArg) => {
        return (
            <>
                <label className="p-1">
                    {arg.event.start && formattedTime(arg.event.start)}
                </label>
                <label className="p-1">{arg.event.title}</label>
            </>
        )
    }, []);

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
                start: "title prev,next today",
                center: "",
                end: "",
            }}
            locale={"ja"}
            businessHours={true}
            dayMaxEvents={true}
            events={events.map(e => e.toEventLabel())}
            datesSet={handleDatesSet}
            eventClick={handleEventClick}
            eventContent={handleEventContent}
        />
    );
}

export default Calendar;