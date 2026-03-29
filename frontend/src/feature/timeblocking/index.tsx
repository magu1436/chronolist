import { DndContext, MouseSensor, pointerWithin, useSensor, useSensors } from "@dnd-kit/core";
import { Box, Stack } from "@mui/material";
import { useState } from "react";

import TimeTable from "./components/TimeTable";
import TimeTableConfigure from "./contexts/TimeTableConfigure";
import { Time } from "@/utils/time";
import BlockAvailable from "./components/BlockAvailable";
import BlocksArea from "./components/BlocksArea";
import TemplateBlockArea from "./components/TemplateBlockArea";
import SelectedTimeBlockId from "./contexts/SelectedTimeBlockClientId";
import TimeBlockDetailPanel from "./components/TimeBlockDetailPanel";


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

    const [ selectedTimeBlockId, setSelectedTimeBlockId ] = useState<string | null>(null);

    const mouseSensor = useSensor(MouseSensor, {activationConstraint: {distance: 10}});
    const sensors = useSensors(mouseSensor);

    return (
        
        <DndContext
            collisionDetection={pointerWithin}
            onDragEnd={(event) => {console.log(event)}}
            sensors={sensors}
        >
            <TimeTableConfigure value={tableConfig}>
                <SelectedTimeBlockId value={{ selectedTimeBlockId, setSelectedTimeBlockClientId: setSelectedTimeBlockId }}>
                    <BlockAvailable>
                        <Stack direction={"row"} sx={{width: "100vw", height: "100vh"}}>
                            <Box sx={{height: "100%", width: "50%"}}><TimeTable /></Box>
                            <Stack
                                sx={{
                                    height: "100%",
                                    width: "50%",
                                    border: "1px solid red",
                                }}
                            >
                                <BlocksArea />
                                <TemplateBlockArea />
                            </Stack>
                        </Stack>
                        <TimeBlockDetailPanel />
                    </BlockAvailable>
                </SelectedTimeBlockId>
            </TimeTableConfigure>
        </DndContext>
    )
}

export default TimeBlockingPage;