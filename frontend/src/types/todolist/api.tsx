import type { DueKind, Priority } from "./statics"

export type DueApi = {
    due_kind: DueKind,
    date: string,
    time: string,
};

export type ToDoTaskApi = {
    id: number,
    title: string,
    due: DueApi,
    priority: Priority,
    isCompleted: boolean,
    memo: string,
};