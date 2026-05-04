import { useState } from "react"

import type CalendarEvent from "./entity/calendarEvent";
import CalendarEventsContext from "./components/contexts/calendar-events-context"
import SelectedCalendarEventContext from "./components/contexts/selected-event"
import Calendar from "./components/calendar";

import { getCalendarEvents } from "./api/get";


const SchedulerPage = () => {

    const [events, setEvents] = useState<CalendarEvent[]>(getCalendarEvents("", ""));
    const updateEvent = (clientId: string, updatedEvent: CalendarEvent | ((updatedEvent: CalendarEvent) => CalendarEvent), callApi?: boolean) => {
        const oldEvent = events.find(e => e.clientId === clientId);
        if (!oldEvent) throw new Error("Event not found.");
        const newEvent = typeof updatedEvent === "function" ? updatedEvent(oldEvent) : updatedEvent;
        setEvents(events.map(event => event.clientId === newEvent.clientId ? newEvent : event));
        // if (callApi) updateEventApi(updatedEvent);
    };

    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

    return (
        <CalendarEventsContext value={{events, setEvents, updateEvent}} >
            <SelectedCalendarEventContext value={{eventClientId: selectedEventId, setEventClientId: setSelectedEventId}} >
                <Calendar />
            </SelectedCalendarEventContext>
        </CalendarEventsContext>
    )
    
}

export default SchedulerPage;