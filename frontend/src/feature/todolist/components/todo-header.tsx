import classNames from "classnames";

import { ToDoLabelCellClassName } from "../statics/todolabel_statics";
import { ToDoHeaderDisplayTexts } from "../statics/todoheader-statics";
import type { FC } from "react";
import CheckBox from "@/components/checkbox";

const ToDoHeader: FC<{checkboxChangeHandler: (checked: boolean) => void}> = ({ checkboxChangeHandler }) => {
    return (
        <div className={classNames("d-flex")}>
            <div className={classNames(ToDoLabelCellClassName.checkbox, "p-2", "border")}>
                <CheckBox onChange={checkboxChangeHandler} />
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