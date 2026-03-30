import axios from "@/utils/axios";


const deleteApi = async (id: number) => {

    // テスト用コード
    console.log("timeblocking/timeBlock");

    await axios.delete(
        "timeblocking/timeBlock",
        {
            data: {
                id: id,
            },
        },
    );
};

export default deleteApi;