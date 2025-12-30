import { memo, useContext, type FC } from "react";
import classNames from "classnames";

import ToDoHeader from "./todo-header";
import ToDoLabel from "./todo-label";
import AllToDoTasksContext from "./all-todotasks-context";


const ToDoTableClassName = "todotable";
const ToDoTableBodyClassName = "todotable-body";

const MemoizedToDoLabel = memo(ToDoLabel);

/**
 * ToDoリスト全体を表示するテーブルコンポーネント。
 * APIからタスクを取得し、一覧として描画する。
 */
const ToDoTable: FC = () => {
    const { tasks } = useContext(AllToDoTasksContext);

    return (
        <div className={ToDoTableClassName}>
            <ToDoHeader />
            <div className={classNames(ToDoTableBodyClassName, "d-flex", "flex-column", "overflow-y-scroll")}>
                {tasks.map(task => (
                    // <ToDoLabel key={task.id} toDoTask={task} />
                    <MemoizedToDoLabel key={task.id} toDoTask={task} />
                ))}
            </div>
        </div>
    );
};

export default ToDoTable;
