import { useEffect, useState } from "react";

import type { ToDoTask } from "@/feature/todolist/types/todotask";
import { SelectedToDoTaskContext } from "./components/selected-todotask-context";
import AllToDoTasksContext from "./components/all-todotasks-context";
import ToDoTable from "./components/todotable";
import TaskDetailDisplay from "./components/task-detail-display";
import useFetch from "@/utils/fetch";
import type { GetAllApi } from "@/types/todolist/api";
import toToDoTask from "@/api/mapper/toDoListMapper";
import { updateTask as updateTaskApi } from "./api/update-api";
import classNames from "classnames";
import Buttons from "./components/buttons";
import RegisterModal from "./components/modals/register-modal";


const ToDoListPage = () => {

    
    const [allTasks, setAllTasks] = useState<ToDoTask[]>([]);
    const updateTask = (updatedTask: ToDoTask, callApi?: boolean) => {
        setAllTasks(allTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
        if (callApi) updateTaskApi(updatedTask);
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

    const [ showRegisterModal, setShowRegisterModal ] = useState(false);

    return (
        <SelectedToDoTaskContext value={{ id: selectedTaskId, set: setSelectedTaskId }}>
            <AllToDoTasksContext value={{ tasks: allTasks, setTasks: setAllTasks, updateTask}}>
                <div className="d-flex">
                    <div className={classNames("d-flex", "flex-column")}>
                        <Buttons onRegisterButtonClicked={() => {setShowRegisterModal(true);}} onDeleteButtonClicked={() => {}}/>
                        <ToDoTable />
                    </div>
                    <TaskDetailDisplay />
                </div>
                <RegisterModal show={showRegisterModal} setShow={setShowRegisterModal} />
            </AllToDoTasksContext>
        </SelectedToDoTaskContext>
    )
}

export default ToDoListPage;