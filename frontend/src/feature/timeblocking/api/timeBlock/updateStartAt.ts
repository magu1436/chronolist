import axios from "@/utils/axios"
import type { Time } from "@/utils/time"

const updateStartAt = async (id: number, startAt: Time) => {

    // テスト用コード
    console.log("timeblocking/timeBlock/updateStartAt");
    console.log("id: ", id);
    console.log("startAt: ", startAt);

    try {
        await axios.post(
            "timeblocking/timeBlock/updateStartAt",
            {
                id: id,
                startAt: startAt.toString(),
            }
        )
    } catch (error) {
        throw error;
    }
};

export default updateStartAt;