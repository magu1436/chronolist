import { useContext, type FC } from "react";
import { Paper, Typography } from "@mui/material";
import { useDraggable } from "@dnd-kit/core";

import { type TimeBlockSource } from "../types/blockSourceTypes";
import TimeTableConfigure from "../contexts/TimeTableConfigure";


const TimeBlock: FC<{ source: TimeBlockSource}> = ({source}) => {

    const {
        setNodeRef,
        listeners,
        attributes,
        transform,
        isDragging,
    } = useDraggable({
        id: source.id,
    });

    const {
        slotHeight,
        slotMinutes,
    } = useContext(TimeTableConfigure);

    let top;
    if (source.status === "PLACED" && source.startAt) {
        top = source.startAt.toMinutes() * (slotHeight / slotMinutes);
    }

    return (
        <Paper
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            sx={{
                bgcolor: source.color,
                color: "white",
                width: "auto",
                height: `${Math.floor(source.width * (slotHeight / slotMinutes))}px`,
                display: "inline-flex",
                maxWidth: "100%",
                overflowWrap: "anywhere",
                margin: "2px",
                padding: "5px",
                transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
                position: source.status === "PLACED" ? "absolute" : "unset",
                top,
            }}
        >
            <Typography variant="h6">{source.title}</Typography>
        </Paper>
    );
};

export default TimeBlock;