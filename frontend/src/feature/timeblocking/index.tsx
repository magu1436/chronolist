import { DndContext, pointerWithin } from "@dnd-kit/core";

import TimeBlock from "./components/TimeBlock"
import TimeTable from "./components/TimeTable";
import { Box, Stack } from "@mui/material";
import type { TimeTableSource } from "./types/timeTableSource";
import TimeTableConfigure from "./contexts/TimeTableConfigure";
import { Time } from "@/utils/time";
import { useState } from "react";
import type { TimeBlockSource } from "./types/blockSourceTypes";
import BlocksAtField from "./contexts/BlocksAtField";


const TimeBlockingPage = () => {

    const timeTableSource: TimeTableSource = {
        id: 121,
        date: new Date(),
        blocks: [
            {
                id: 3,
                timeTableId: 1,
                status: "PLACED",
                relatedSchedle: null,
                width: 90,
                startAt: new Time("1:30"),
                tasks: [],
                color: "red",
                title: "test block 3",
            },
            {
                id: 4,
                timeTableId: 1,
                status: "PLACED",
                relatedSchedle: null,
                width: 60,
                startAt: new Time("2:30"),
                tasks: [],
                color: "blue",
                title: "test block 4",
            }
        ],
    };

    const tableConfig = {
        gridSize: 1,
        tableHeight: 2000,
        tableWidth: "100%",
        startTime: new Time(0, 0),
        slotMinutes: 30,
        slotHeight: 2000 * 30 / (24 * 60),
    };

    const [ blocksAtField, setBlocksAtField ] = useState<TimeBlockSource[]>([{
        id: 1,
        timeTableId: 1,
        status: "HOLD",
        relatedSchedle: null,
        width: 120,
        startAt: null,
        tasks: [],
        color: "red",
        title: "test block 1 test block 2 test block 3 test block 4",
    },  
    {
        id: 2,
        timeTableId: 1,
        status: "HOLD",
        relatedSchedle: null,
        width: 150,
        startAt: null,
        tasks: [],
        color: "red",
        title: "test block 2",
    }]);

    return (
        
        <DndContext
            collisionDetection={pointerWithin}
            onDragEnd={(event) => {console.log(event)}}
        >
            <TimeTableConfigure value={tableConfig}>
                <BlocksAtField value={{blocksAtField, setBlocksAtField}}>
                    <Stack direction={"row"}>
                        <Box sx={{height: "100vh", width: "50vw"}}><TimeTable source={timeTableSource} /></Box>
                        {blocksAtField.map((block) => <TimeBlock key={block.id} source={block} />)}
                    </Stack>
                </BlocksAtField>
            </TimeTableConfigure>
        </DndContext>
    )
}

export default TimeBlockingPage;