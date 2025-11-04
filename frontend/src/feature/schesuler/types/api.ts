import type { ScheduleKind } from "./statics"

export type CalendarEventApi = {
    id: number,
    kind: ScheduleKind,
    startAt: string | null,
    endAt: string | null,
    startDate: string | null,
    endDate: string | null,
    title: string,
    color: string,
    memo: string | null,
};

export type RegisterApi = {
    kind: ScheduleKind,
    startAt: string | null,
    endAt: string | null,
    startDate: string | null,
    endDate: string | null,
    title: string,
    color: string,
    memo: string | null,
};