import { useContext, type FC } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Box, Stack, Typography } from "@mui/material";

import type { TimeTableSource } from "../types/timeTableSource";
import { Time } from "@/utils/time";
import { TIMETABLE_ID } from "../static/droppableId";
import TimeTableConfigure from "../contexts/TimeTableConfigure";


const HourScaleMark: FC<{ label: string }> = ({ label }) => {

    const { gridSize, slotHeight } = useContext(TimeTableConfigure);

    return (
        <>
            <Typography
                variant="body2"
                sx={{
                    borderTop: gridSize,
                    height: slotHeight,
                }}>
                    {label}
                </Typography>
        </>
    );
};


const SmallScaleMark: FC<{label: string}> = ({label}) => {

    const { gridSize, slotHeight } = useContext(TimeTableConfigure);

    return (
        <>
            <Typography
                variant="caption"
                sx={{
                    borderTop: gridSize,
                    height: slotHeight,
                }}>
                    {label}
                </Typography>
        </>
    );
}


function* scaleRange(start: Time, end: Time, step: number) {
    for (let i = start.toMinutes(); i <= end.toMinutes(); i += step) {
        if (i % 60 === 0) {
            yield (<HourScaleMark key={i} label={new Time(i).toString()} />);
            continue;
        }
        yield (<SmallScaleMark key={i} label={new Time(i).toString()} />);
    }
}


const Legend = () => {

    const {
        startTime,
        slotMinutes,
    } = useContext(TimeTableConfigure);
    const endTime = startTime.add(24 * 60);

    return (
        <Stack alignItems={"flex-end"}>
            {Array.from(scaleRange(startTime, endTime, slotMinutes))}
        </Stack>
    )
}


const Table: FC<{source: TimeTableSource}> = ({source}) => {

    const {
        gridSize,
        tableHeight,
        tableWidth,
        slotHeight,
    } = useContext(TimeTableConfigure);

    const {
        setNodeRef,
        isOver,
    } = useDroppable({
        id: TIMETABLE_ID,
    });

    return (
        <Box
            ref={setNodeRef} 
            sx={{
                height: tableHeight,
                border: gridSize,
                width: tableWidth,
                backgroundImage: `repeating-linear-gradient(180deg, white 0 ${slotHeight - gridSize}px, black ${slotHeight - gridSize}px ${slotHeight}px)`
            }}
        ></Box>
    )
}


const TimeTable: FC<{source: TimeTableSource}> = ({source}) => {
    return (
        <Box
            sx={{
                overflowY: "scroll",
                height: "100%",
                p: 4,
                border: 1,
            }}
        >
            <Stack
                direction={"row"}
                alignItems={"flex-start"}
            >
                <Legend />
                <Table source={source} />
            </Stack>
        </Box>
    )
}


export default TimeTable;