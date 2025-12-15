import type { FC } from "react";
import type { DueDisplayTextProps } from "../type/props";
import classNames from "classnames";

/**
 * 期限表示用のテキストを描画するコンポーネント。
 * 期限種別に応じて日時、日付、プレースホルダーを出し分ける。
 */
const DueDisplayText: FC<DueDisplayTextProps> = ({
    dueKind,
    dueDate,
    dueTime,
}) => {
    if (dueKind === "NONE") return "--:--";

    if (dueKind === "DATE") return dueDate;

    return (
        <div className={classNames("d-flex", "flex-column", "align-items-center")}>
            <div>{dueDate}</div>
            <div>{dueTime}</div>
        </div>
    );
};

export default DueDisplayText;
