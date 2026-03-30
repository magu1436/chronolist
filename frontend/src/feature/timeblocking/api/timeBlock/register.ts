import axios from "@/utils/axios";
import type { TimeBlockSource } from "../../types/blockSourceTypes";


const register = async (block: TimeBlockSource) => {
    try {
        const res = await axios.post(
            "timeblocking/timeBlock/register",
            {
                timeTableId: block.timeTableId,
                title: block.title,
                status: block.status,
                width: block.width,
                startAt: block.startAt?.toString(),
                tasks: block.tasks,
                color: block.color,
            },
        );
        return res.data as number;
    } catch (error) {
        throw error;
    }
};

export default register;