import type { Priority } from "@/types/todolist/statics";

/**
 * 優先度の表示テキストを内部データ上の文字列に変換する。
 * 
 * @param displayText 優先度の表示用テキスト
 * @returns 内部データ上の文字列
 * @throws 変換できない文字列を受け取った場合に生じる
 */
export const convertDisplayTextToPriority = (displayText: string): Priority => {
    switch (displayText) {
        case "高":
            return "HIGH";
        case "中":
            return "MIDDLE";
        case "低":
            return "LOW";
    }
    throw new Error("[chronolist]unknown display text: " + displayText);
};