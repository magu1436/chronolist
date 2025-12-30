import type { DueKind, Priority } from "@/types/todolist/statics";

export type ToDoTaskApiFormat = {
    id: number,
    title: string,
    dueKind: DueKind,
    dueDate: string | null,
    dueTime: string | null,
    priority: Priority,
    isCompleted: boolean,
    memo: string | null,
};

export type InsertApiFormat = Omit<ToDoTaskApiFormat, "id">;