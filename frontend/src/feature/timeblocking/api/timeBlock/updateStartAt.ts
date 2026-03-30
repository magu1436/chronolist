import { customizedFetch } from "@/utils/fetch";
import type { Time } from "@/utils/time"

const updateStartAt = async (id: number, startAt: Time) => {

    // テスト用コード
    console.log("timeblocking/timeBlock/update/startAt");
    console.log("id: ", id);
    console.log("startAt: ", startAt);

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