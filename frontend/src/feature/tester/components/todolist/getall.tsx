import { useEffect, useState, type FC } from "react";

import type { DueApi, GetAllApi } from "@/types/todolist/api";
import type { ToDoTask } from "@/types/todolist/todotask";
import Due from "@/utils/todolist/due";
import classNames from "classnames";
import toToDoTask from "@/api/mapper/toDoListMapper";
import useFetch from "@/utils/fetch";

const GetAllResult = () => {

    type TasksType = {
        api: GetAllApi,
        task: ToDoTask,
    };

    const { data, isLoading, error } = useFetch<GetAllApi[]>("/todolist/getAll");    

    const createTasks = (apiResult: GetAllApi[] | undefined): TasksType[] => {
        if (!apiResult) return [];
        return apiResult.map(api => {
            return {
                api: api,
                task: toToDoTask(api),
            }
        });
    }

    const [tasks, setTasks] = useState<TasksType[]>(createTasks(data));

    useEffect(() => {
        setTasks(createTasks(data));
    }, [data]);

    if (isLoading) return (
        <h1>Loading...</h1>
    );

    if (error) return (
        <>
            <h1>Some error happend!</h1>
            <div className="m-2">{error.message}</div>
            <div className="m-2">{error.stack}</div>
            <div className="m-2">{error.name}</div>
        </>
    );

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