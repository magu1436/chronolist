import { useContext } from "react"
import classNames from "classnames";

import { SelectedToDoTaskContext } from "../selected-todotask-context"
import CheckBox from "@/components/checkbox";
import AllToDoTasksContext from "../all-todotasks-context";


const TASK_DETAIL_DISPLAY_IS_COMPLETED_CLASS_NAME_TAG = "task-detail-display-is-completed";
const TASK_DETAIL_DISPLAY_IS_COMPLETED_CLASS_NAMES = classNames(
    TASK_DETAIL_DISPLAY_IS_COMPLETED_CLASS_NAME_TAG,
    "d-flex", "align-items-center"
);

const IsCompleted = () => {

    const { id: selectedTaskId, } = useContext(SelectedToDoTaskContext);
    const { tasks, updateTask } = useContext(AllToDoTasksContext);
    const selectedTask = tasks.find(task => task.id === selectedTaskId);

    const handleCheckboxChange = (checked: boolean) => {
        if (!selectedTask) return;
        updateTask({...selectedTask, isCompleted: checked});
    }

    return (
        <div className={TASK_DETAIL_DISPLAY_IS_COMPLETED_CLASS_NAMES}>
            {"完了"}
            <CheckBox defaultChecked={selectedTask && selectedTask.isCompleted} onChange={handleCheckboxChange} />  
        </div>
    )
}

export default IsCompleted;