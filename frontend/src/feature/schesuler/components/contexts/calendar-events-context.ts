import { createContext } from "react";

import CalendarEvent from "../../entity/calendarEvent";


const CalendarEventsContext = createContext<{
    events: CalendarEvent[],
    setEvents: (events: CalendarEvent[]) => void,
    updateEvent: (updatedEvent: CalendarEvent, callApi?: boolean) => void
}>({
    events: [],
    setEvents: () => { },
    updateEvent: () => { },
});

export default CalendarEventsContext;