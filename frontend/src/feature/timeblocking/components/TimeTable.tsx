import { useContext, useCallback, useState, type FC } from "react";
import { useDroppable, useDndMonitor, type DragOverEvent, type DragMoveEvent } from "@dnd-kit/core";
import { Box, Stack, Typography } from "@mui/material";

import type { TimeTableSource } from "../types/timeTableSource";
import { Time } from "@/utils/time";
import { TIMETABLE_ID } from "../static/droppableId";
import TimeTableConfigure from "../contexts/TimeTableConfigure";
import type { TimeBlockSource } from "../types/blockSourceTypes";
import TimeBlock from "./TimeBlock";
import { PREVIEW_BLOCK_ID } from "../static/previewBlock";


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

    const [blocksOnTable, setBlocksOnTable] = useState<TimeBlockSource[]>(source.blocks);
    const [ prevPointTime, setPrevPointTime ] = useState<Time | null>(null);

    const {
        gridSize,
        tableHeight,
        tableWidth,
        slotHeight,
        slotMinutes,
    } = useContext(TimeTableConfigure);

    const {
        setNodeRef,
        isOver,
        rect,
    } = useDroppable({
        id: TIMETABLE_ID,
    });

    const pointToTime = useCallback((relativePointerY: number) => {
        const time = new Time(Math.floor(relativePointerY / slotHeight) * slotMinutes);
        return time;
    }, []);

    const previewBlockSource = useCallback((event: DragOverEvent | DragMoveEvent) => {

        if (!rect.current?.top || !event.active.rect.current?.translated) {
            throw new Error("Invalid event");
        };
        const originalSource: TimeBlockSource = event.active.data.current as TimeBlockSource;

        const prevSource: TimeBlockSource = {
            id: PREVIEW_BLOCK_ID,
            timeTableId: source.id,
            title: originalSource.title,
            status: "PLACED",
            relatedSchedle: null,
            width: originalSource.width,
            startAt: prevPointTime,
            tasks: [],
            color: originalSource.color,
        };

        return prevSource;
    }, []);

    const removePrevBlock = useCallback(() => {
        setBlocksOnTable(blocksOnTable.filter(block => block.id !== PREVIEW_BLOCK_ID));
        setPrevPointTime(null);
    }, []);

    useDndMonitor({
        onDragMove(event) {
            // console.log("--start: Drag Move----------------------------")
            if (prevPointTime === null) {
                console.log("prevPointTime is null");
                return;
            };
            if (!rect?.current?.top || !event.active?.rect?.current?.translated) {
                console.log("Invalid event");
                return;
            };
            const cursorTime = pointToTime(event.active.rect.current.translated.top - rect.current.top);
            console.log(`cursorTime: ${cursorTime}`);
            if (prevPointTime.toMinutes() === cursorTime.toMinutes()) return;
            
            setPrevPointTime(cursorTime);
            removePrevBlock();
            setBlocksOnTable([...blocksOnTable, previewBlockSource(event)]);
        },
        onDragOver(event) {
            console.log("--start: Drag over----------------------------")
            if (event.over) {
                if (!rect?.current?.top || !event.active?.rect?.current?.translated) {
                    console.log("Invalid event");
                    return;
                };
                setPrevPointTime(pointToTime(event.active.rect.current.translated.top - rect.current.top));
                return;
            }
            removePrevBlock();
            console.log("point time become null");
            setPrevPointTime(null);
        },
        onDragEnd(event) {
            removePrevBlock();
        },
        onDragCancel() {
            console.log("--start: Drag Cancel----------------------------")
            removePrevBlock();
        },
    });

    return (
        <Box
            ref={setNodeRef} 
            sx={{
                height: tableHeight,
                border: gridSize,
                width: tableWidth,
                backgroundImage: `repeating-linear-gradient(180deg, white 0 ${slotHeight - gridSize}px, black ${slotHeight - gridSize}px ${slotHeight}px)`,
                position: "relative",
            }}
        >
            {blocksOnTable.map(block => <TimeBlock key={block.id} source={block} />)}
        </Box>
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