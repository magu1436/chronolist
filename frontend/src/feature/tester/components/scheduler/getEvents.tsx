import useFetch from "@/utils/fetch";
import { useMemo } from "react"


const GetEventsResults = () => {

    /**
     * サーバーに送信するデータ
     */
    const body = useMemo(() => {
        return {
            start: "2025-10-01",
            end: "2025-10-31",
        };
    }, []);

}