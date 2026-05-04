import { useContext, useEffect, useState, type FC } from "react"

import type CalendarEvent from "../../entity/calendarEvent"
import CalendarEventsContext from "../contexts/calendar-events-context";
import SelectedCalendarEventContext from "../contexts/selected-event";
import { Divider, Stack } from "@mui/material";
import Header from "./header";
import Time from "./Time";
import Color from "./Color";
import Memo from "./Memo";

/**
 * カレンダーイベントの詳細を表示・編集可能にするサイドパネル
 */
type SidePanelProps = {}

const SidePanel: FC<SidePanelProps> = () => {
    
    const [ calendarEvent, setCalendarEvent ] = useState<CalendarEvent | null>(null);

    const {
        events,
        setEvents,
        updateEvent,
    } = useContext(CalendarEventsContext);

    const {
        eventClientId,
        setEventClientId,
    } = useContext(SelectedCalendarEventContext);

    // 選択中のカレンダーイベントを拾う
    useEffect(() => {
        if (!eventClientId) return;
        const event = events.find(e => e.clientId === eventClientId);
        if (!event) throw new Error("Event not found.");
        setCalendarEvent(event);
    }, [eventClientId, setCalendarEvent]);

    const handleChangeTitle = (title: string) => {
        if (!calendarEvent) return;
        calendarEvent.title = title;
        setCalendarEvent(calendarEvent);
        updateEvent(calendarEvent.clientId, calendarEvent, true);
    };

    const hangeDelete = () => {
        if (!calendarEvent) return;
        // クライアント側の削除
        setEvents(events.filter(e => e.clientId !== calendarEvent.clientId));
        setEventClientId(null);
        // サーバー側の削除
        // deleteApi(calendarEvent.id);
    }

    const handleChangeColor = (color: string) => {
        if (!calendarEvent) return;
        calendarEvent.color = color;
        setCalendarEvent(calendarEvent);
        updateEvent(calendarEvent.clientId, calendarEvent, true);
    };

    const handleChangeMemo = (memo: string) => {
        if (!calendarEvent) return;
        calendarEvent.memo = memo;
        setCalendarEvent(calendarEvent);
        updateEvent( calendarEvent.clientId, calendarEvent, true);
    };

    return (
        <>
            <Stack
                direction={"column"}
                divider={<Divider orientation="horizontal" flexItem />}
            >
                <Header
                    title={calendarEvent?.title || ""}
                    setTitle={handleChangeTitle}
                    onDelete={hangeDelete}
                />
                <Time
                    kind={calendarEvent?.kind || "DATED"}
                    start={calendarEvent?.startAt || calendarEvent?.startDate || new Date()}
                    end={calendarEvent?.endAt || calendarEvent?.endDate || new Date()}
                    setCalendarEvent={setCalendarEvent}
                />
                <Color
                    color={calendarEvent?.color || "RED"}
                    onChange={handleChangeColor}
                />
                <Memo
                    memo={calendarEvent?.memo || ""}
                    onChange={handleChangeMemo}
                />
            </Stack>
        </>
    )
};

export default SidePanel;