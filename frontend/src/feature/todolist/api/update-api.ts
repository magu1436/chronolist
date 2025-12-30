import { customizedFetch } from "@/hooks/fetch"
import type { ToDoTask } from "@/types/todolist/todotask";

export const updateTask = (updatedTask: ToDoTask) => {
    customizedFetch<ToDoTask>({
        url: "/todolist/update",
        method: "PUT",
        data: updatedTask,
    });
};

export const updateStatus = (id: number, isCompleted: boolean) => {
    customizedFetch<ToDoTask>({
        url: "/todolist/update/status",
        method: "PUT",
        data: { id, isCompleted },
    });
};