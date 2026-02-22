import { Time } from "@/utils/time";
import { createContext } from "react";

const TimeTableConfigure = createContext<{
    gridSize: number,
    tableHeight: number,
    tableWidth: number | string,
    startTime: Time,
    slotMinutes: number,
    slotHeight: number
}>({
    gridSize: 1,
    tableHeight: 2000,
    tableWidth: "100%",
    startTime: new Time(0, 0),
    slotMinutes: 30,
    slotHeight: 2000 * 30 / (24 * 60),
});

export default TimeTableConfigure;