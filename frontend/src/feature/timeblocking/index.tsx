import { DndContext, pointerWithin } from "@dnd-kit/core";
import { Box, Stack } from "@mui/material";
import { useState } from "react";

import TimeTable from "./components/TimeTable";
import TimeTableConfigure from "./contexts/TimeTableConfigure";
import { Time } from "@/utils/time";
import BlockAvailable from "./components/BlockAvailable";
import BlocksArea from "./components/BlocksArea";
import TemplateBlockArea from "./components/TemplateBlockArea";
import SelectedTimeBlockId from "./contexts/SelectedTimeBlockId";


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

    const [ selectedTimeBlockId, setSelectedTimeBlockId ] = useState<number | null>(null);

    return (
        
        <DndContext
            collisionDetection={pointerWithin}
            onDragEnd={(event) => {console.log(event)}}
        >
            <TimeTableConfigure value={tableConfig}>
                <SelectedTimeBlockId value={{ selectedTimeBlockId, setSelectedTimeBlockId }}>
                    <BlockAvailable>
                        <Stack direction={"row"}>
                            <Box sx={{height: "100vh", width: "50vw"}}><TimeTable /></Box>
                            <Stack
                                sx={{
                                    height: "100vh",
                                    width: "50vw",
                                    border: "1px solid red",
                                }}
                            >
                                <BlocksArea />
                                <TemplateBlockArea />
                            </Stack>
                        </Stack>
                    </BlockAvailable>
                </SelectedTimeBlockId>
            </TimeTableConfigure>
        </DndContext>
    )
}

export default TimeBlockingPage;