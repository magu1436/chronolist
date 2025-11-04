import type { Priority } from "./statics";

export interface ToDoTask {
    id: number,
    title: string,
    dueKind: string | null,
    date: string | null,
    time: string | null,
    priority: Priority,
    isCompleted: boolean,
    memo?: string,
};