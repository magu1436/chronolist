import { Paper, Typography } from "@mui/material"
import { type ComponentPropsWithoutRef, type FC } from "react";

import type { TimeBlockSource } from "../types/blockSourceTypes";


type TimeBlockViewProps = {
    source: TimeBlockSource,
    ref?: React.Ref<HTMLDivElement>
} & ComponentPropsWithoutRef<typeof Paper>;

const TimeBlockView: FC<TimeBlockViewProps> = ({ source, ref, sx, ...rest }) => {
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
};

export default TimeBlockView;
