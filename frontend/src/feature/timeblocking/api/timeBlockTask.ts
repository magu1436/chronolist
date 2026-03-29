import { type TimeBlockSource, type TimeBlockTask } from "../types/blockSourceTypes";

/**
 * タイムブロックにタスクを追加するAPI
 * 
 * 未実装であり, 一時的に仮のIDを返す
 * @param block タスクを追加するブロック
 * @param task 追加するタスク
 * @returns 作成したタスクのID
 */
export const register = async (block: TimeBlockSource, task: TimeBlockTask) => {
    return -1;
};