import type { Priority } from "@/types/todolist/statics";
import type { FC } from "react";

const PriorityDisplayText: FC<{priority: Priority}> = ({ priority }) => {
    switch (priority) {
        case "HIGH":
            return "高";
        case "MIDDLE":
            return "中";
        case "LOW":
            return "低";
    }
}

export default PriorityDisplayText;