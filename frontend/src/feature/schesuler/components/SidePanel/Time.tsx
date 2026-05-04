import type { FC } from "react";
import { Stack, Typography } from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import CheckBox from "@/components/checkbox";
import EditableDateText from "@/components/EditableDateText";
import EditableTimeText from "@/components/EditableTimeText";
import type { ScheduleKind } from "../../types/statics"
import { Time as MyTime } from "@/utils/time";
import CalendarEvent from "../../entity/calendarEvent";


type TimeProps = {
    kind: ScheduleKind,
    start: Date,
    end: Date,
    setCalendarEvent: ( calendarEvent: (CalendarEvent | null) | ((calendarEvent: (CalendarEvent | null)) => CalendarEvent | null)) => void,
}

type AllDayCheckBoxProps = {
    kind: ScheduleKind,
    onChangeKind: (kind: ScheduleKind) => void,
}

type DateTimeBox = {
    kind: ScheduleKind,
    time: Date,
    onChangeTime: (time: Date) => void,
}

const Time: FC<TimeProps> = ({
    kind,
    start,
    end,
    setCalendarEvent
}) => {
    const handleChangeStartTime = (time: Date) => {
        setCalendarEvent((c) => {
            if (!c) return null;
            const clone = c.clone();
            if (kind === "ALL_DAY") clone.startDate = time;
            else clone.startAt = time;
            return clone;
        })
    };
    const handleChangeEndTime = (time: Date) => {
        setCalendarEvent((c) => {
            if (!c) return null;
            const clone = c.clone();
            if (kind === "ALL_DAY") clone.endDate = time;
            else clone.endAt = time;
            return clone;
        })
    }
    const handleChangeKind = (kind: ScheduleKind) => {
        setCalendarEvent ((c) => {
            if (!c) return null;
            const clone = c.clone();
            clone.kind = kind;
            return clone;
        });
    }
    return (
        <>
            <Stack direction={"column"} alignItems={"center"}>
                <AllDayCheckBox kind={kind} onChangeKind={handleChangeKind} />
                <DateTimeBox kind={kind} time={start} onChangeTime={handleChangeStartTime} />
                <ArrowDownwardIcon />
                <DateTimeBox kind={kind} time={end} onChangeTime={handleChangeEndTime} />
            </Stack>
        </>
    )
};

const AllDayCheckBox: FC<AllDayCheckBoxProps> = ({kind, onChangeKind}) => {
    return (
        <>
            <Stack direction={"row"} sx={{ml: "auto"}}>
                <Typography>終日</Typography>
                <CheckBox defaultChecked={kind === "ALL_DAY"} onChange={(checked) => onChangeKind(checked ? "ALL_DAY" : "DATED")} />
            </Stack>
        </>
    );
}

const DateTimeBox: FC<DateTimeBox> = ({kind, time, onChangeTime}) => {
    const isAllDay = kind === "ALL_DAY";
    const AllDayFC = <EditableDateText value={time} onChange={onChangeTime} />;
    const DatedFC = (
        <Stack direction={"row"}>
            <EditableDateText value={time} onChange={onChangeTime} />
            <EditableTimeText value={new MyTime(time)} onChange={(time) => onChangeTime(new Date(time.toString()))} />
        </Stack>
    );
    return isAllDay ? AllDayFC : DatedFC;
}

export default Time;