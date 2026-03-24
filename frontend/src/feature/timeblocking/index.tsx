import { DndContext, pointerWithin } from "@dnd-kit/core";
import { Box, Stack } from "@mui/material";

import TimeTable from "./components/TimeTable";
import TimeTableConfigure from "./contexts/TimeTableConfigure";
import { Time } from "@/utils/time";
import BlockAvailable from "./components/BlockAvailable";
import BlocksArea from "./components/BlocksArea";


const TimeBlockingPage = () => {

    const tableConfig = {
        timeTableId: 1,
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
                <BlockAvailable>
                    <Stack direction={"row"}>
                        <Box sx={{height: "100vh", width: "50vw"}}><TimeTable /></Box>
                        <BlocksArea />
                    </Stack>
                </BlockAvailable>
            </TimeTableConfigure>
        </DndContext>
    )
}

export default TimeBlockingPage;