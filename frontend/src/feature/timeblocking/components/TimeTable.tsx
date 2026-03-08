import { useContext, useCallback, useState, type FC } from "react";
import { useDroppable, useDndMonitor } from "@dnd-kit/core";
import { Box, Stack, Typography } from "@mui/material";

import type { TimeTableSource } from "../types/timeTableSource";
import { Time } from "@/utils/time";
import { TIMETABLE_ID } from "../static/droppableId";
import TimeTableConfigure from "../contexts/TimeTableConfigure";
import type { TimeBlockSource } from "../types/blockSourceTypes";
import TimeBlock from "./TimeBlock";
import { PREVIEW_BLOCK_ID } from "../static/previewBlock";
import BlocksAtField from "../contexts/BlocksAtField";


/**
 * 一時間あたり目盛りを描画するコンポーネント.  
 */
const HourScaleMark: FC<{ label: string }> = ({ label }) => {

    const { gridSize, slotHeight } = useContext(TimeTableConfigure);

    return (
        <>
            <Typography
                variant="body2"
                sx={{
                    borderTop: gridSize,
                    height: slotHeight,
                }}>
                    {label}
            </Typography>
        </>
    );
};


/**
 * 小刻み目盛りを描画するコンポーネント.  
 * 
 * 時間表の小刻み目盛りを描画する.  
 * {@link HourScaleMark} よりも小さい目盛りを描画する.  
 */
const SmallScaleMark: FC<{label: string}> = ({label}) => {

    const { gridSize, slotHeight } = useContext(TimeTableConfigure);

    return (
        <>
            <Typography
                variant="caption"
                sx={{
                    borderTop: gridSize,
                    height: slotHeight,
                }}>
                    {label}
                </Typography>
        </>
    );
}


function* scaleRange(start: Time, end: Time, step: number) {
    for (let i = start.toMinutes(); i <= end.toMinutes(); i += step) {
        if (i % 60 === 0) {
            yield (<HourScaleMark key={i} label={new Time(i).toString()} />);
            continue;
        }
        yield (<SmallScaleMark key={i} label={new Time(i).toString()} />);
    }
}



/**
 * 時間表の小刻み目盛りの凡例を描画するコンポーネント.
 * 
 * 一時間単位の目盛りは {@link HourScaleMark} を使用して描画され,  
 * そうでないスロットごとの目盛りは {@link SmallScaleMark} を使用して描画される.
 */
const Legend = () => {

    const {
        startTime,
        slotMinutes,
    } = useContext(TimeTableConfigure);
    const endTime = startTime.add(24 * 60);

    return (
        <Stack alignItems={"flex-end"}>
            {Array.from(scaleRange(startTime, endTime, slotMinutes))}
        </Stack>
    )
}


/**
 * タイムテーブルを描画するコンポーネント.
 *   
 * {@link TimeBlockSource} に基づいてタイムテーブルを描画する.  
 * {@link useDroppable} を使用してドラッグ先として利用可能なコンポーネントとして  
 * 実装されており, {@link TimeBlock} を設置できる.  
 */
const Table: FC<{source: TimeTableSource}> = ({source}) => {

    // テーブル上のブロックのリストのステート
    // ブロックを並列に描画するロジックの生成時に使用する可能性があるため残しておく
    const [ blocksOnTable, setBlocksOnTable ] = useState<TimeBlockSource[]>(source.blocks);
    
    const [ prevPointTime, setPrevPointTime ] = useState<Time | null>(null);
    const [ prevBlockSource, setPrevBlockSource ] = useState<TimeBlockSource | null>(null);

    const {
        gridSize,
        tableHeight,
        tableWidth,
        slotHeight,
        slotMinutes,
    } = useContext(TimeTableConfigure);

    const {
        blocksAtField,
        setBlocksAtField,
    } = useContext(BlocksAtField);

    const {
        setNodeRef,
        rect,
        active,
        isOver,
    } = useDroppable({
        id: TIMETABLE_ID,
    });

    const pointToTime = useCallback((relativePointerY: number) => {
        const time = new Time(Math.floor(relativePointerY / slotHeight) * slotMinutes);
        return time;
    }, []);

    const createPrevBlockSorce = useCallback((startAt: Time, originalSource: TimeBlockSource): TimeBlockSource => {
        console.log(`original: ${originalSource}`);
        return {
            ...originalSource,
            id: PREVIEW_BLOCK_ID,
            timeTableId: source.id,
            status: "PLACED",
            startAt,
        };
    }, []);

    const removePrevBlock = useCallback(() => {
        setPrevPointTime(null);
        setPrevBlockSource(null);
        console.log("prevBlock removed");
    }, []);

    useDndMonitor({
        onDragMove(event) {
            // エラー処理
            if (prevPointTime === null) {
                console.log("prevPointTime is null");
                return;
            };
            if (!rect?.current?.top || !event.active?.rect?.current?.translated || !event.active.data.current) {
                console.log("Invalid event");
                return;
            };

            const cursorTime = pointToTime(event.active.rect.current.translated.top - rect.current.top);
            
            // カーソル操作時, そのカーソルに対応した時刻を出力するテスト用のコード
            // テスト時に便利なため残しておく
            // console.log(`cursorTime: ${cursorTime}`);
            
            // カーソル移動時でも, 同じ時刻の範囲ならば何もしない(負荷軽減)
            if (prevPointTime.toMinutes() === cursorTime.toMinutes()) return;

            // プレビューブロックの作成
            setPrevBlockSource(createPrevBlockSorce(cursorTime, event.active.data.current.source));
        },
        onDragOver(event) {
            if (event.over) {
                if (!rect?.current?.top || !event.active?.rect?.current?.translated || !event.active.data.current) {
                    console.log("Invalid event");
                    return;
                };
                setPrevPointTime(pointToTime(event.active.rect.current.translated.top - rect.current.top));
                return;
            }
            removePrevBlock();
            console.log("point time become null");
        },
        onDragEnd() {
            if (isOver && active?.data.current && prevBlockSource) {
                const movedBlockId = active.data.current.source.id;
                setBlocksAtField(blocksAtField.filter(block => block.id !== movedBlockId));
                setBlocksOnTable([...blocksOnTable, {...prevBlockSource, id: movedBlockId}]);
            }
            removePrevBlock();
        },
        onDragCancel() {
            console.log("Dragging Cancelled");
            removePrevBlock();
        },
    });

    return (
        <Box
            ref={setNodeRef} 
            sx={{
                height: tableHeight,
                border: gridSize,
                width: tableWidth,
                backgroundImage: `repeating-linear-gradient(180deg, white 0 ${slotHeight - gridSize}px, black ${slotHeight - gridSize}px ${slotHeight}px)`,
                position: "relative",
            }}
        >
            {blocksOnTable.map(block => <TimeBlock key={block.id} source={block} />)}
            {prevBlockSource && <TimeBlock source={prevBlockSource} />}
        </Box>
    )
}


const TimeTable: FC<{source: TimeTableSource}> = ({source}) => {

    return (
        <Box
            sx={{
                overflowY: "scroll",
                height: "100%",
                p: 4,
                border: 1,
            }}
        >
            <Stack
                direction={"row"}
                alignItems={"flex-start"}
            >
                <Legend />
                <Table source={source} />
            </Stack>
        </Box>
    )
}


export default TimeTable;