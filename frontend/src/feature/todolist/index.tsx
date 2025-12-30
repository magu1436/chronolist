import { useEffect, useState } from "react";

import type { ToDoTask } from "@/types/todolist/todotask";
import { SelectedToDoTaskContext } from "./components/selected-todotask-context";
import ToDoTable from "./components/todotable";
import TaskDetailDisplay from "./components/task-detail-display";
import useFetch from "@/utils/fetch";
import type { GetAllApi } from "@/types/todolist/api";
import toToDoTask from "@/api/mapper/toDoListMapper";
import AllToDoTasksContext from "./components/all-todotasks-context";
import { updateTask as updateTaskApi } from "./api/update-api";

const ToDoListPage = () => {

    
    const [allTasks, setAllTasks] = useState<ToDoTask[]>([]);
    const updateTask = (updatedTask: ToDoTask, callApi?: boolean) => {
        setAllTasks(allTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
        if (callApi) {
            updateTaskApi(updatedTask)
            console.log("updated!")
        }
    };
    
    const { data, isLoading, error } = useFetch<GetAllApi[]>(
        "todolist/getAll",
        "GET",
    );

    useEffect(() => {
        if (error) throw error;
        if (data) setAllTasks(data.map(toToDoTask));
    }, [ isLoading ])

    const [ selectedTaskId, setSelectedTaskId ] = useState<number | null>(null);

    return (
        <SelectedToDoTaskContext value={{ id: selectedTaskId, set: setSelectedTaskId }}>
            <AllToDoTasksContext value={{ tasks: allTasks, setTasks: setAllTasks, updateTask}}>
                <div className="d-flex">
                    <ToDoTable />
                    <TaskDetailDisplay />
                </div>
            </AllToDoTasksContext>
        </SelectedToDoTaskContext>
    )
}

export default ToDoListPage;