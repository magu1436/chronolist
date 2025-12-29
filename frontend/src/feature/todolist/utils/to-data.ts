import type { Priority } from "@/types/todolist/statics";

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