import axios from "@/utils/axios";


const deleteApi = async (id: number) => {
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