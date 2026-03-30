import { customizedFetch } from "@/utils/fetch";


const deleteApi = async (id: number) => {

    // テスト用コード
    console.log("timeblocking/timeBlock");

    try {
        await customizedFetch<void>(
            {
                url: "/timeblocking/timeBlock/delete",
                method: "DELETE",
                data: { id },
            }
        )
    } catch (error) {
        throw error;
    }
};

export default deleteApi;