import type { TimeTableApi } from "../types/api";
import type { TimeTableSource } from "../types/timeTableSource";
import { toTimeBlockSource } from "./blockMapper";


/**
 * `TimeTableApi` を `TimeTableSource` に変換するマッパー関数.
 * 
 * @param api APIオブジェクト
 * @return 変換されたオブジェクト
 */
export const toTimeTableSource = (api: TimeTableApi): TimeTableSource => {
    return {
        id: api.id,
        date: new Date(api.date),
        blocks: api.blocks?.map(block => toTimeBlockSource(block)) || [],
    };
};