import { DndContext, pointerWithin } from "@dnd-kit/core";

import TimeBlock from "./components/TimeBlock"
import TimeTable from "./components/TimeTable";
import { Box } from "@mui/material";
import type { TimeTableSource } from "./types/timeTableSource";


const TimeBlockingPage = () => {

    const timeTableSource: TimeTableSource = {
        id: 121,
        date: new Date(),
        blocks: [],
    };

    return (
        
        <DndContext
            collisionDetection={pointerWithin}
            onDragEnd={(event) => {console.log(event)}}
        >
            <TimeBlock source={{
                id: 1,
                timeTableId: 1,
                status: "HOLD",
                relatedSchedle: null,
                width: 1,
                startAt: null,
                tasks: [],
                color: "red",
                title: "test block 1 test block 2 test block 3 test block 4 test block 5 test block 6 test block 7 test block 8 test block 9 test block 10 test block 1 test block 2 test block 3 test block 4 test block 5 test block 6 test block 7 test block 8 test block 9 test block 10 test block 1 test block 2 test block 3 test block 4 test block 5 test block 6 test block 7 test block 8 test block 9 test block 10",
            }} />
            <Box sx={{height: "50vh", width: "50vw"}}><TimeTable source={timeTableSource} /></Box>
        </DndContext>
    )
}

export default TimeBlockingPage;