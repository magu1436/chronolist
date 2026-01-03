import { createContext } from "react";

import CalendarEvent from "@/feature/schesuler/entity/calendar-event";

const SelectedCalendarEventContext = createContext<{
    event: CalendarEvent | null,
    setEvent: (event: CalendarEvent | null) => void
}>({
    event: null,
    setEvent: () => { }
});

export default SelectedCalendarEventContext;