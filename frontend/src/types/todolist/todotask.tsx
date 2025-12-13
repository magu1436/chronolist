import type { DueKind, Priority } from "./statics";

export interface ToDoTask {
    id: number,
    title: string,
    dueKind: DueKind,
    dueDate: string | null,
    dueTime: string | null,
    priority: Priority,
    isCompleted: boolean,
    memo?: string,
};