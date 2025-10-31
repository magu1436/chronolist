import type { FC } from "react";

import type { DueApi, ToDoTaskApi } from "@/types/todolist/api";
import type { ToDoTask } from "@/types/todolist/todotask";
import Due from "@/utils/todolist/due";

const GetAllResult = () => {

    const api: ToDoTaskApi = {
        id: 0,
        title: "test title",
        due: {
            dueKind: "NONE",
            date: null,
            time: null,
        },
        priority: "low",
        isCompleted: false,
        memo: null,
    };

    const task: ToDoTask = {
        id: 0,
        title: "test title",
        due: Due.createFromDueApi(api.due),
        priority: "low",
        isCompleted: true,
        memo: "test memo",
    };

    return (
        <>
            <h1>ToDoTask by API</h1>
            <TaskDisplay task={api}/>
            <h1>ToDoTask on React</h1>
            <TaskDisplay task={task} />
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
    task: ToDoTask | ToDoTaskApi,
}

export default GetAllResult;