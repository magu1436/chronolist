import { customizedFetch } from "@/utils/fetch";
import type { TemplateBlockSource } from "../../types/blockSourceTypes";


const register = async (block: TemplateBlockSource) => {
    const data = {
        title: block.title,
        width: block.width,
        color: block.color,
    };

    try {
        const res = await customizedFetch<number>(
            {
                url: "/timeblocking/templateBlock/register",
                method: "PUT",
                data,
            }
        );
        return res;
    } catch (error) {
        throw error;
    }
}

export default register;