import EditableTimeText from "@/components/EditableTimeText";
import { Time } from "@/utils/time";
import { Stack } from "@mui/material";
import { useCallback, useState, type FC } from "react";


type TimeRangeProps = {
    width?: number,
    startAt?: Time,
    setStartAt: (startAt: Time) => void
};

/**
 * 開始日時と終了日時を表示するコンポーネント
 */
const TimeRange: FC<TimeRangeProps> = ({ width = 0, startAt = new Time(), setStartAt }) => {
    const [ endAt, setEndAt ] = useState(startAt.add(width));

    /**
     * 開始日時を変更したときの処理.  
     */
    const handleSetStartAt = useCallback((startAt: Time) => {
        setStartAt(startAt);
        setEndAt(startAt.add(width));
    }, [width, setStartAt, setEndAt]);

    /**
     * 終了日時を変更したときの処理.  
     * 保守性を考慮して開始日時を変更する関数を呼び出す.
     */
    const handleSetEndAt = useCallback((endAt: Time) => {
        handleSetStartAt(endAt.subtract(width));
    }, [width, handleSetStartAt]);

    return (
        <Stack>
            <EditableTimeText value={startAt} onChange={handleSetStartAt} />
            <EditableTimeText value={endAt} onChange={handleSetEndAt} />
        </Stack>
    );
};

export default TimeRange;