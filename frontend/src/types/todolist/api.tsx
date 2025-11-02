import type { DueKind, Priority } from "./statics"

export type DueApi = {
    dueKind: DueKind,
    date: string | null,
    time: string | null,
};

export type GetAllApi = {
    id: number,
    title: string,
    due: DueApi,
    priority: Priority,
    isCompleted: boolean,
    memo: string | null,
};

export type RegisterApi = {
    title: string,
    due: DueApi,
    priority: Priority,
    isCompleted: boolean,
    memo: string | null,
};

export type UpdateApi = GetAllApi;

export type UpdateStatusApi = {
    id: number,
    isCompleted: boolean,
};