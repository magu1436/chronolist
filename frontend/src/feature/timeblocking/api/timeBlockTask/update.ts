import { customizedFetch } from "@/utils/fetch";
import type { TimeBlockTask } from "../../types/blockSourceTypes";

const update = async (task: TimeBlockTask) => {

    const submitData = {
        id: task.id,
        timeBlockId: task.timeBlockId,
        title: task.title
    }

    try {
        await customizedFetch<void>(
            {
                url: "/timeblocking/timeBlockTask/update",
                method: "PUT",
                data: submitData,
            }
        );
    } catch (error) {
        throw error;
    }
}

export default update;