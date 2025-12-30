import { useState, type FC, useContext, useCallback, useEffect } from "react";
import classNames from "classnames";

import type { ToDoLabelProps } from "../type/props";
import { ToDoLabelCellClassName } from "../statics/todolabel-statics";
import CheckBox from "@/components/checkbox";
import DueDisplayText from "./due-display-text";
import PriorityDisplayText from "./priority-display-text";
import { SelectedToDoTaskContext } from "./selected-todotask-context";

import "@/feature/todolist/assets/todolabel.css";
import AllToDoTasksContext from "./all-todotasks-context";

const ToDoLabelClassName = "todolabel";

/**
 * ToDoリストの1行を表示するコンポーネント。
 * チェックボックス操作で完了状態を切り替える。
 */
const ToDoLabel: FC<ToDoLabelProps> = ({ toDoTask }) => {
    const { tasks, setTasks } = useContext(AllToDoTasksContext);

    /**
     * チェックボックスの変更に合わせてタスク情報を更新する
     * @param checked チェック状態
     */
    const handleCheckboxChange = (checked: boolean) => {
        setTasks(tasks.map(task => task.id === toDoTask.id ? {...task, isCompleted: checked} : task));
    };

    const { id: selectedTaskId, set } = useContext(SelectedToDoTaskContext);

    /**
     * このラベルがクリックされた際に, 選択中のタスクをこのラベルが持つタスクに更新する。
     */
    const handleLabelClick = useCallback(() => {
        if (!set) throw new Error("[chronolist]function 'set' is undefined.");
        set(toDoTask.id);
    }, []);

    return (
        <div className={classNames(ToDoLabelClassName, (toDoTask.id === selectedTaskId) && "selected-label", "d-flex")} onClick={ handleLabelClick }>
            <div className={classNames(ToDoLabelCellClassName.checkbox, "p-2", "border")}>
                <CheckBox
                    defaultChecked={toDoTask.isCompleted}
                    onChange={handleCheckboxChange}
                />
            </div>
            <div className={classNames(ToDoLabelCellClassName.title, toDoTask.isCompleted && "text-decoration-line-through", "p-2", "border")}>
                {toDoTask.title}
            </div>
            <div className={classNames(ToDoLabelCellClassName.priority, toDoTask.isCompleted && "text-decoration-line-through", "p-2", "border")}>
                <PriorityDisplayText priority={toDoTask.priority} />
            </div>
            <div className={classNames(ToDoLabelCellClassName.due, toDoTask.isCompleted && "text-decoration-line-through", "p-2", "border")}>
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
