import classNames from "classnames";

import { ToDoLabelCellClassName } from "../statics/todolabel_statics";
import { ToDoHeaderDisplayTexts } from "../statics/todoheader-statics";

const ToDoHeader = () => {
    return (
        <div className={classNames("d-flex")}>
            <div className={classNames(ToDoLabelCellClassName.checkbox, "p-2", "border")}>
                {ToDoHeaderDisplayTexts.checkbox}
            </div>
            <div className={classNames(ToDoLabelCellClassName.title, "p-2", "border")}>
                {ToDoHeaderDisplayTexts.title}
            </div>
            <div className={classNames(ToDoLabelCellClassName.priority, "p-2", "border")}>
                {ToDoHeaderDisplayTexts.priority}
            </div>
            <div className={classNames(ToDoLabelCellClassName.due, "p-2", "border")}>
                {ToDoHeaderDisplayTexts.due}
            </div>
        </div>
    )
};

export default ToDoHeader;