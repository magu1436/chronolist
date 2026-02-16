import type { ScheduleSource } from "@/feature/schesuler/types/scheduleSourceType"
import type { TimeBlockStatus } from "./statics"
import type { Time } from "@/utils/time"


export type TimeBlockSource = {
    id: number,
    timeTableId: number,
    title: string,
    status: TimeBlockStatus,
    relatedSchedle: ScheduleSource | null,
    width: number,
    startAt: Time | null,
    tasks: string[],
    color: string,
}

export type TemplateBlockSource = {
    id: number,
    title: string,
    width: number,
    color: string,
}