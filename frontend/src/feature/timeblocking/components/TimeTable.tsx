import type { FC } from "react";
import type { TimeTableSource } from "../types/timeTableSource";
import { Box, Stack, Typography } from "@mui/material";
import { Time } from "@/utils/time";

// 目盛りグリッド線の太さ
const GRID_SIZE: number = 1;
// テーブルの高さ
const TABLE_HEIGHT: number = 2000;
// 目盛り幅（分）
const SLOT_MINUTES: number = 30;

const START_TIME = new Time(0, 0);
const END_TIME = START_TIME.add(24 * 60);

// 目盛りの値を示す部分の高さ
let _scaleMarkHeight: number | undefined;


const scaleMarkHeight = () => {
    if (_scaleMarkHeight) {
        return _scaleMarkHeight;
    }
    const smh = 24 * 60 / SLOT_MINUTES;
    if (!Number.isInteger(smh)) {
        throw new Error("scaleMarkHeight is invalid.");
    }
    _scaleMarkHeight = TABLE_HEIGHT / smh;
    return _scaleMarkHeight;
}

const HourScaleMark: FC<{ label: string }> = ({ label }) => {
    return (
        <>
            <Typography
                variant="body2"
                sx={{
                    borderTop: GRID_SIZE,
                    height: scaleMarkHeight(),
                }}>
                    {label}
                </Typography>
        </>
    );
};

const SmallScaleMark: FC<{label: string}> = ({label}) => {
    return (
        <>
            <Typography
                variant="caption"
                sx={{
                    borderTop: GRID_SIZE,
                    height: scaleMarkHeight(),
                }}>
                    {label}
                </Typography>
        </>
    );
}

function* scaleRange(start: Time, end: Time, step: number) {
    for (let i = start.toMinutes(); i <= end.toMinutes(); i += step) {
        if (i % 60 === 0) {
            yield (<HourScaleMark key={i} label={new Time(i).toString()} />);
            continue;
        }
        yield (<SmallScaleMark key={i} label={new Time(i).toString()} />);
    }
}

const Legend = () => {
    return (
        <Stack alignItems={"flex-end"}>
            {Array.from(scaleRange(START_TIME, END_TIME, SLOT_MINUTES))}
        </Stack>
    )
}

const Table = () => {
    return (
        <Box sx={{
            height: TABLE_HEIGHT,
            border: GRID_SIZE,
            width: "100%",
            // background: `${GRID_SIZE}px linear-gradient(to top, #fff ${scaleMarkHeight()}px, #000 ${scaleMarkHeight()}px)`,
            backgroundImage: `repeating-linear-gradient(180deg, white 0 ${scaleMarkHeight() - GRID_SIZE}px, black ${scaleMarkHeight() - GRID_SIZE}px ${scaleMarkHeight()}px)`
        }}></Box>
    )
}

const TimeTable = () => {
    return (
        <Box
            sx={{
                overflowY: "scroll",
                height: "100%",
                p: 4,
                border: 1,
            }}
        >
            <Stack
                direction={"row"}
                alignItems={"flex-start"}
            >
                <Legend />
                <Table />
            </Stack>
        </Box>
    )
}

export default TimeTable;