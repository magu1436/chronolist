import { customizedFetch } from "@/utils/fetch";
import type { TemplateBlockSource } from "../../types/blockSourceTypes";


const register = async (block: TemplateBlockSource) => {
    // const data = {
    //     title: block.title,
    //     width: block.width,
    //     color: block.color,
    // };

    // try {
    //     const res = await customizedFetch<number>(
    //         {
    //             url: "/timeblocking/templateBlock/register",
    //             method: "PUT",
    //             data,
    //         }
    //     )
    //     console.log("new id: ", res);
    //     return res;
    // } catch (error) {
    //     throw error;
    // }
    console.log("TemplateBlock was registered.");
    return -1;
}

export default register;