import type { DueKind } from "@/types/todolist/statics";
import type { ToDoTask } from "@/types/todolist/todotask";

/**
 * ToDoラベルコンポーネントに渡されるタスク情報のプロパティ型。
 */
export type ToDoLabelProps = {
    toDoTask: ToDoTask;
};

/**
 * 期限表示テキストコンポーネントに渡される期限情報のプロパティ型。
 */
export type DueDisplayTextProps = {
    dueKind: DueKind;
    dueDate: string | null;
    dueTime: string | null;
};
