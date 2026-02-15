import type { FC } from "react";
import { Paper, Typography } from "@mui/material";

import { type TimeBlockSource } from "../types/blockSourceTypes";


const TimeBlock: FC<{ source: TimeBlockSource}> = ({source}) => {
    return (
        <Paper
            sx={{
                bgcolor: source.color,
                color: "white",
                width: "auto",
                display: "inline-flex",
                maxWidth: "100%",
                overflowWrap: "anywhere",
                margin: "2px",
                padding: "5px",
            }}
        >
            <Typography variant="h6">{source.title}</Typography>
        </Paper>
    );
};

export default TimeBlock;