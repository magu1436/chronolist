import type { Priority } from "./statics";

export interface ToDoTask {
    id: number,
    title: string,
    dueKind: string | null,
    dueDate: string | null,
    dueTime: string | null,
    priority: Priority,
    isCompleted: boolean,
    memo?: string,
};