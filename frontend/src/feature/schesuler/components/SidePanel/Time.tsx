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
    startAt: Date | null,
    endAt: Date | null,
    startDate: Date | null,
    endDate: Date | null,
    setCalendarEvent: ( calelendarEvent: CalendarEvent | ((calendarEvent: CalendarEvent) => void)) => void,
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
    startAt,
    endAt,
    startDate,
    endDate,
    setCalendarEvent
}) => {
    const handleChangeStartTime = (time: Date) => {
        setCalendarEvent((c) => {
            if (kind === "ALL_DAY") c.startDate = time;
            else c.startAt = time;
        })
    };
    const handleChangeEndTime = (time: Date) => {
        setCalendarEvent((c) => {
            if (kind === "ALL_DAY") c.endDate = time;
            else c.endAt = time;
        })
    }
    const handleChangeKind = (kind: ScheduleKind) => {
        setCalendarEvent ((c) => c.kind = kind);
    }
    return (
        <>
            <Stack direction={"column"} alignItems={"center"}>
                <AllDayCheckBox kind={kind} onChangeKind={handleChangeKind} />
                <DateTimeBox kind={kind} time={startAt || startDate || new Date()} onChangeTime={handleChangeStartTime} />
                <ArrowDownwardIcon />
                <DateTimeBox kind={kind} time={endAt || endDate || new Date()} onChangeTime={handleChangeEndTime} />
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