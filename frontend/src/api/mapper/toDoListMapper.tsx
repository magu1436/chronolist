import type { GetAllApi } from "@/types/todolist/api";
import type { ToDoTask } from "@/types/todolist/todotask";


const toToDoTask = (apiObj: GetAllApi): ToDoTask => {
    return {
        id: apiObj.id,
        title: apiObj.title,
        dueKind: apiObj.dueKind,
        date: apiObj.date,
        time: apiObj.time,
        priority: apiObj.priority,
        isCompleted: apiObj.isCompleted,
        memo: apiObj.memo || undefined,
    }
};

export default toToDoTask;