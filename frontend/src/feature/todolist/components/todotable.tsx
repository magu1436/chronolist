
import useFetch from "@/utils/fetch"
import { useEffect, useState } from "react";

import type { GetAllApi } from "@/types/todolist/api"
import type { ToDoTask } from "@/types/todolist/todotask";
import toToDoTask from "@/api/mapper/toDoListMapper";
import ToDoHeader from "./todo-header";
import ToDoLabel from "./todoLabel";
import classNames from "classnames";

const ToDoTableClassName = "todotable";
const ToDoTableBodyClassName = "todotable-body";

const ToDoTable = () => {
    const {data, isLoading, error} = useFetch<GetAllApi[]>("todolist/getAll");

    const [tasks, setTasks] = useState<ToDoTask[]>([]);

    useEffect(() => {
        if (!data) return;

        setTasks(data.map(toDoTask => toToDoTask(toDoTask)));

    }, [isLoading]);

    return(
        <div className={ToDoTableClassName}>
            <ToDoHeader />
            <div className={classNames(ToDoTableBodyClassName, "d-flex", "flex-column", "overflow-y-scroll")}>
                {tasks.map(task => (
                    <ToDoLabel key={task.id} toDoTask={task} />
                ))}
            </div>
        </div>
    )

}

export default ToDoTable;