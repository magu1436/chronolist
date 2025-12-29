import type { Priority } from "@/types/todolist/statics";

/**
 * 優先度を表示するための文字列に変換する。  
 * 現在は日本語にのみ対応。  
 * 
 * TODO: 言語設定に合わせて変更できるようにする
 * 
 * @param priority 内部データ構造の優先度の値
 * @returns 優先度の値を表示するテキストに変換した文字列
 */
export const convertPriorityToDisplayText = ( priority: Priority ) => {
    switch (priority) {
        case "HIGH":
            return "高";
        case "MIDDLE":
            return "中";
        case "LOW":
            return "低";
    };
    throw new Error("unknown priority");
};