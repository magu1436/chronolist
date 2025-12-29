export type DueKind = "NONE" | "DATED" | "DATETIME";

export const PriorityEnum = {
    HIGH: "HIGH",
    MIDDLE: "MIDDLE",
    LOW: "LOW",
} as const;

export type Priority = (typeof PriorityEnum)[keyof typeof PriorityEnum];