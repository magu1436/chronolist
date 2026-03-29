import EditableNumberText from "@/components/EditableNumberText";
import { Stack, Typography } from "@mui/material";
import type { FC } from "react";


type WidthProps = {
    width: number;
    setWidth: (width: number) => void;
};

const Width: FC<WidthProps> = ({ width, setWidth }) => {
    return (
        <Stack spacing={1} direction={"row"}>
            <EditableNumberText variant="subtitle1" value={width} onChange={setWidth} />
            <Typography>min</Typography>
        </Stack>
    );
};

export default Width;