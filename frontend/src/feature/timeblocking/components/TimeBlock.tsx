import type { FC } from "react";
import { Paper, Typography } from "@mui/material";
import { useDraggable } from "@dnd-kit/core";

import { type TimeBlockSource } from "../types/blockSourceTypes";


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

    return (
        <Paper
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            sx={{
                bgcolor: source.color,
                color: "white",
                width: "auto",
                display: "inline-flex",
                maxWidth: "100%",
                overflowWrap: "anywhere",
                margin: "2px",
                padding: "5px",
                transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
            }}
        >
            <Typography variant="h6">{source.title}</Typography>
        </Paper>
    );
};

export default TimeBlock;