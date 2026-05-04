import { customizedFetch } from "@/utils/fetch"

const deleteApi = async (id: number) => {
    try {
        await customizedFetch<void>(
            {
                url: "/timeblocking/timeBlockTask/delete",
                method: "DELETE",
                data: { id },
            }
        );
    } catch (error) {
        throw error;
    }
};

export default deleteApi;