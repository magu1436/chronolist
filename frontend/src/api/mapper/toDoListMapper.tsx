import type { ToDoTaskApi } from "@/types/todolist/api";
import type { ToDoTask } from "@/types/todolist/todotask";
import Due from "@/utils/todolist/due";


const toToDoList = (apiObj: ToDoTaskApi): ToDoTask => {
    return {
        id: apiObj.id,
        title: apiObj.title,
        due: Due.createFromDueApi(apiObj.due),
        priority: apiObj.priority,
        isCompleted: apiObj.isCompleted,
        memo: apiObj.memo || undefined,
    }
};

export default toToDoList;