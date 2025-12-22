import { useState } from "react";

import type { ToDoTask } from "@/types/todolist/todotask";
import { SelectedToDoTaskContext } from "./components/selected-todotask-context";
import ToDoTable from "./components/todotable";

const ToDoListPage = () => {
    
    const [selectedToDoTask, setSelectedToDoTask] = useState<ToDoTask | null>(null);

    return (
        <SelectedToDoTaskContext value={{ task: selectedToDoTask, set: setSelectedToDoTask }} >
            <ToDoTable />
        </SelectedToDoTaskContext>
    )
}

export default ToDoListPage;