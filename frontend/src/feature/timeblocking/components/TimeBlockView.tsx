import { Paper, Typography } from "@mui/material"
import { forwardRef, type ComponentPropsWithoutRef } from "react";

import type { TimeBlockSource } from "../types/blockSourceTypes";


type TimeBlockViewProps = {
    source: TimeBlockSource,
} & ComponentPropsWithoutRef<typeof Paper>;

const TimeBlockView = forwardRef<HTMLDivElement, TimeBlockViewProps>(
    ({ source, sx, ...rest }, ref) => {
        return (
            <Paper
                ref={ref}
                {...rest}
                sx={{
                    bgcolor: source.color,
                    color: "white",
                    display: "inline-flex",
                    overflowWrap: "anywhere",
                    padding: "5px",
                    zIndex: 1,
                    ...sx,
                }}
            >
                <Typography variant="h6">{source.title}</Typography>
            </Paper>
        );
    }
);

export default TimeBlockView;
