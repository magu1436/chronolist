import type Due from "../../utils/todolist/due";
import type { Priority } from "./statics";

export interface ToDoTask {
    id: number,
    title: string,
    due: Due,
    priority: Priority,
    isCompleted: boolean,
    memo?: string,
}
