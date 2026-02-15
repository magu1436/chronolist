import type { TimeBlockStatus } from "./statics"


export type TimeBlockSource = {
    id: number,
    timeTableId: number,
    title: string,
    status: TimeBlockStatus,
    relatedSchedle: Schedule,
    width: number,
    startAt: Date | null,
    tasks: string[],
    color: string,
}

export type TemplateBlockSource = {
    id: number,
    title: string,
    width: number,
    color: string,
}