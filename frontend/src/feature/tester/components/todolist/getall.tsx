import type { FC } from "react";

import type { DueApi, GetAllApi } from "@/types/todolist/api";
import type { ToDoTask } from "@/types/todolist/todotask";
import Due from "@/utils/todolist/due";
import classNames from "classnames";
import toToDoTask from "@/api/mapper/toDoListMapper";

const GetAllResult = () => {

    const api: GetAllApi = {
        id: 0,
        title: "test title",
        due: {
            dueKind: "NONE",
            date: "2025-10-31",
            time: "22:29",
        },
        priority: "low",
        isCompleted: false,
        memo: null,
    };

    const task: ToDoTask = toToDoTask(api);

    const tasks = [{api: api, task: task}];

    return (
        <>
            {tasks.map(t => {
                return (
                    <div className={classNames("m-2", "border", "border-primary", "border-3")}>
                        <h1>ToDoTask by API</h1>
                        <TaskDisplay task={t.api}/>
                        <h1>ToDoTask on React</h1>
                        <TaskDisplay task={t.task} />
                    </div>
                );
            })}
        </>
    )
}

const DueDisplay: FC<DueDisplayProps> = ({due}) => {
    if ("date" in due) return (
        <>
            <div>dueKind: {due.dueKind}</div>
            <div>date: {due.date}</div>
            <div>time: {due.time}</div>
        </>
    ) 

    return (
        <>
            <div>dueKind: {due.dueKind}</div>
            <div>dueAt: {due.dueAt?.toISOString()}</div>
        </>
    )
};

type DueDisplayProps = {
    due: Due | DueApi,
};

const TaskDisplay: FC<TaskDisplayProp> = ({task}) => {
    const {id, due, title, priority, isCompleted, memo} = task;
    return (
        <>
            <div>id: {id}</div>
            <div>title: {title}</div>
            <DueDisplay due={due} />
            <div>priority: {priority}</div>
            <div>isCompleted: {isCompleted}</div>
            <div>memo: {memo}</div>
        </>
    )
};

type TaskDisplayProp = {
    task: ToDoTask | GetAllApi,
}

export default GetAllResult;