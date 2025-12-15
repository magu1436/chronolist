import type { Priority } from "@/types/todolist/statics";
import type { FC } from "react";

/**
 * 優先度の種別を日本語テキストに変換して表示するコンポーネント。
 */
const PriorityDisplayText: FC<{ priority: Priority }> = ({ priority }) => {
    switch (priority) {
        case "HIGH":
            return "高";
        case "MIDDLE":
            return "中";
        case "LOW":
            return "低";
    }
};

export default PriorityDisplayText;
