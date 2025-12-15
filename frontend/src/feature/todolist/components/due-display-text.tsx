import type { FC } from "react"
import type { DueDisplayTextProps } from "../type/props"
import classNames from "classnames";

const DueDisplayText: FC<DueDisplayTextProps> = ({
    dueKind,
    dueDate,
    dueTime,
}) => {
    if (dueKind === "NONE") return ("--:--");

    if (dueKind === "DATED") return (dueDate);

    return (
        <div className={classNames("d-flex", "flex-column", "align-items-center")}>
            <div>{dueDate}</div>
            <div>{dueTime}</div>
        </div>
    );
}

export default DueDisplayText;