import classNames from "classnames"
import Title from "./task-detail-display-components/title"
import IsCompleted from "./task-detail-display-components/is-completed"
import Priority from "./task-detail-display-components/priority"
import Due from "./task-detail-display-components/due"
import Memo from "./task-detail-display-components/memo"


const TASK_DETAIL_DISPLAY_ID = "task-detail-display"
const TASK_DETAIL_DISPLAY_CLASS_NAMES = classNames("d-flex", "flex-column", "align-items-center")

const TaskDetailDisplay = () => {
    return (
        <div id={TASK_DETAIL_DISPLAY_ID} className={TASK_DETAIL_DISPLAY_CLASS_NAMES}>
            <Title />
            <div className="d-flex">
                <IsCompleted />
                <Priority />
            </div>
            <Due />
            <Memo />
        </div>
    )
}

export default TaskDetailDisplay;