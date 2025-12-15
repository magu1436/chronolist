import { useState, type FC } from "react";
import type { ToDoLabelProps } from "../type/props";
import { ToDoLabelCellClassName } from "../statics/todolabel_statics";
import CheckBox from "@/components/checkbox";
import classNames from "classnames";
import DueDisplayText from "./due-display-text";
import PriorityDisplayText from "./priority-display-text";

import "@/feature/todolist/assets/todolabel.css";

const ToDoLabelClassName = "todolabel";

/**
 * ToDoリストの1行を表示するコンポーネント。
 * チェックボックス操作で完了状態を切り替える。
 */
const ToDoLabel: FC<ToDoLabelProps> = ({ toDoTask }) => {
    const [isCompleted, setIsCompleted] = useState<boolean>(toDoTask.isCompleted);

    /**
     * チェックボックスの変更に合わせて完了状態を更新する。
     * @param checked チェック状態
     */
    const handleCheckboxChange = (checked: boolean) => {
        toDoTask.isCompleted = checked;
        setIsCompleted(checked);
    };

    return (
        <div className={classNames(ToDoLabelClassName, "d-flex")}>
            <div className={classNames(ToDoLabelCellClassName.checkbox, "p-2", "border")}>
                <CheckBox
                    defaultChecked={isCompleted}
                    onChange={handleCheckboxChange}
                />
            </div>
            <div className={classNames(ToDoLabelCellClassName.title, isCompleted && "text-decoration-line-through", "p-2", "border")}>
                {toDoTask.title}
            </div>
            <div className={classNames(ToDoLabelCellClassName.priority, isCompleted && "text-decoration-line-through", "p-2", "border")}>
                <PriorityDisplayText priority={toDoTask.priority} />
            </div>
            <div className={classNames(ToDoLabelCellClassName.due, isCompleted && "text-decoration-line-through", "p-2", "border")}>
                <DueDisplayText
                    dueKind={toDoTask.dueKind}
                    dueDate={toDoTask.dueDate}
                    dueTime={toDoTask.dueTime}
                />
            </div>
        </div>
    );
};

export default ToDoLabel;
