import { DndContext, pointerWithin } from "@dnd-kit/core";

import TimeBlock from "./components/TimeBlock"
import TimeTable from "./components/TimeTable";
import { Box, Stack } from "@mui/material";
import type { TimeTableSource } from "./types/timeTableSource";
import TimeTableConfigure from "./contexts/TimeTableConfigure";
import { Time } from "@/utils/time";


const TimeBlockingPage = () => {

    const timeTableSource: TimeTableSource = {
        id: 121,
        date: new Date(),
        blocks: [],
    };

    const tableConfig = {
        gridSize: 1,
        tableHeight: 2000,
        tableWidth: "100%",
        startTime: new Time(0, 0),
        slotMinutes: 30,
        slotHeight: 2000 * 30 / (24 * 60),
    };

    return (
        
        <DndContext
            collisionDetection={pointerWithin}
            onDragEnd={(event) => {console.log(event)}}
        >
            <TimeTableConfigure value={tableConfig}>
                <Stack direction={"row"}>
                    <Box sx={{height: "100vh", width: "50vw"}}><TimeTable source={timeTableSource} /></Box>
                    <TimeBlock source={{
                        id: 1,
                        timeTableId: 1,
                        status: "HOLD",
                        relatedSchedle: null,
                        width: 120,
                        startAt: null,
                        tasks: [],
                        color: "red",
                        title: "test block 1 test block 2 test block 3 test block 4",
                    }} />
                </Stack>
            </TimeTableConfigure>
        </DndContext>
    )
}

export default TimeBlockingPage;