import type { Priority } from "@/types/todolist/statics";
import type { FC } from "react";

import { convertPriorityToDisplayText } from "@/feature/todolist/utils/to-display-text";

/**
 * 優先度の種別を日本語テキストに変換して表示するコンポーネント。
 */
const PriorityDisplayText: FC<{ priority: Priority }> = ({ priority }) => {
    return (
        <>
            {convertPriorityToDisplayText(priority)}
        </>
    );
};

export default PriorityDisplayText;
