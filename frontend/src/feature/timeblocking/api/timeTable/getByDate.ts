import { customizedFetch } from "@/utils/fetch";
import { toTimeTableSource } from "../../mapper/timeTableMapper";
import type { TimeTableApi } from "../../types/api";


const getByDate = async (date: string) => {
    try {
        const response = await customizedFetch<TimeTableApi>({
            url: "/timeblocking/timeTable/getByDate",
            method: "GET",
            data: { date },
        });
        return toTimeTableSource(response);
    } catch (error: unknown) {
        throw error;
    }
};

export default getByDate;