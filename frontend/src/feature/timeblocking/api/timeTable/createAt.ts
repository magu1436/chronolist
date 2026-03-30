import { customizedFetch } from "@/utils/fetch"


const createAt = async (date: string) => {
    try {
        const res = await customizedFetch<number>({
            url: "/timeblocking/timeTable/createAt",
            method: "POST",
            data: { date },
        });
        return res;
    } catch (error) {
        throw error;
    }
};

export default createAt;