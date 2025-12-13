import type { DueKind } from "@/types/todolist/statics"
import type { ToDoTask } from "@/types/todolist/todotask"

export type ToDoLabelProps = {
    toDoTask: ToDoTask,
}

export type DueDisplayTextProps = {
    dueKind: DueKind,
    dueDate: string | null,
    dueTime: string | null,
}