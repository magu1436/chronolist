import axios from "@/utils/axios";
import type { TimeBlockSource } from "../../types/blockSourceTypes";


const update = async (block: TimeBlockSource) => {

    // テスト用コード
    console.log("timeblocking/timeBlock/update");
    console.log("block: ", block);

    try {
        const res = await axios.post(
            "timeblocking/timeBlock/update",
            {
                id: block.id,
                timeTableId: block.timeTableId,
                title: block.title,
                status: block.status,
                relatedSchedule: block.relatedSchedle,
                width: block.width,
                startAt: block.startAt?.toString(),
                tasks: block.tasks.map(task => {
                    return {
                        id: task.id,
                        title: task.title,
                    }
                }),
                color: block.color,
            }
        );
    } catch (error) {
        throw error;
    }
};

export default update;