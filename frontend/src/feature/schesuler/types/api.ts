import type { ScheduleKind } from "./statics"

export type CalendarEventApi = {
    id: number,
    kind: ScheduleKind,
    startAt: Date | null,
    endAt: Date | null,
    startDate: Date | null,
    endDate: Date | null,
    title: string,
    color: string,
    memo: string | null,
};