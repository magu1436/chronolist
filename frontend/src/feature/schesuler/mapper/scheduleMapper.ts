import { type ScheduleApi } from "../types/api";
import { type ScheduleSource } from "../types/scheduleSourceType";

export const toScheduleSource = (api: ScheduleApi): ScheduleSource => {
    return {
        id: api.id,
        kind: api.kind,
        startAt: api.startAt ? new Date(api.startAt) : null,
        endAt: api.endAt ? new Date(api.endAt) : null,
        startDate: api.startDate ? new Date(api.startDate) : null,
        endDate: api.endDate ? new Date(api.endDate) : null,
        title: api.title,
    };
};