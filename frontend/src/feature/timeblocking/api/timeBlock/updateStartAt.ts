import { customizedFetch } from "@/utils/fetch";
import type { Time } from "@/utils/time"

const updateStartAt = async (id: number, startAt: Time) => {

    try {
        await customizedFetch<void>(
            {
                url: "/timeblocking/timeBlock/update/startAt",
                method: "PUT",
                data: {
                    id: id,
                    startAt: startAt.toString(),
                },
            }
        )
    } catch (error) {
        throw error;
    }
};

export default updateStartAt;