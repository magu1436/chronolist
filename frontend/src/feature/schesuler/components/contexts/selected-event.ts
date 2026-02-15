import { createContext } from "react";

const SelectedCalendarEventContext = createContext<{
    eventId: number | null,
    setEventId: (eventId: number | null) => void
}>({
    eventId: null,
    setEventId: () => { }
});

export default SelectedCalendarEventContext;