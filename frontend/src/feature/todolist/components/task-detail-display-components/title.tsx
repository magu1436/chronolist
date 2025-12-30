import { useContext } from "react"

import { SelectedToDoTaskContext } from "../selected-todotask-context"
import AllToDoTasksContext from "../all-todotasks-context";


// タイトル要素の固有クラス名
const TASK_DETAIL_DISPLAY_TITLE_CLASS_TAG = "task-detail-display-title";

const Title = () => {
    const { id } = useContext(SelectedToDoTaskContext);
    const selectedTask = useContext(AllToDoTasksContext).tasks.find(task => task.id === id);

    return (
        <div className={TASK_DETAIL_DISPLAY_TITLE_CLASS_TAG}>
            {selectedTask?.title}
        </div>
    );
}

export default Title;