
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

    const tasks: ToDoTask[] = [];

    useEffect(() => {
        if (!data) return;

        data.forEach(api => {
            tasks.push(toToDoTask(api));
        });
    }, [isLoading]);

    const [allCheckboxChecked, setAllCheckboxChecked] = useState<boolean>(false);
    const allCheckboxCheckedHandler = (checked: boolean) => {
        setAllCheckboxChecked(checked);
        tasks.forEach(tasks => {
            tasks.isCompleted = checked;
        });
    };

    return(
        <div className={ToDoTableClassName}>
            <ToDoHeader checkboxChangeHandler={allCheckboxCheckedHandler} />
            <div className={classNames(ToDoTableBodyClassName, "d-flex", "flex-column", "overflow-y-scroll")}>
                {tasks.map(task => (
                    <ToDoLabel key={task.id} toDoTask={task} />
                ))}
            </div>
        </div>
    )


}

export default ToDoTable;