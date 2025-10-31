import type { DueKind, Priority } from "./statics"

export type DueApi = {
    dueKind: DueKind,
    date: string | null,
    time: string | null,
};

export type ToDoTaskApi = {
    id: number,
    title: string,
    due: DueApi,
    priority: Priority,
    isCompleted: boolean,
    memo: string | null,
};