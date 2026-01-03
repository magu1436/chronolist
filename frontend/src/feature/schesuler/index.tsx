import { useState } from "react"

import type CalendarEvent from "./entity/calendar-event";
import CalendarEventsContext from "./components/contexts/calendar-events-context"
import SelectedCalendarEventContext from "./components/contexts/selected-event"
import Calendar from "./components/calendar";

import { getCalendarEvents } from "./api/get";


const SchedulerPage = () => {

    const [events, setEvents] = useState<CalendarEvent[]>(getCalendarEvents("", ""));
    const updateEvent = (updatedEvent: CalendarEvent, callApi?: boolean) => {
        setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
        // if (callApi) updateEventApi(updatedEvent);
    };

    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

    return (
        <CalendarEventsContext value={{events, setEvents, updateEvent}} >
            <SelectedCalendarEventContext value={{eventId: selectedEventId, setEventId: setSelectedEventId}} >
                <Calendar />
            </SelectedCalendarEventContext>
        </CalendarEventsContext>
    )
    
}

export default SchedulerPage;