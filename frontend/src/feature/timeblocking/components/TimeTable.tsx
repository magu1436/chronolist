import { useContext, useCallback, useState, type FC, type ReactElement } from "react";
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

    /**
     * プレビューブロックを削除する
     */
    const removePrevBlock = useCallback(() => {
        setPrevPointTime(null);
        setPrevBlockSource(null);
        if (blocksOnTable.find(b => b.id === PREVIEW_BLOCK_ID)) setBlocksOnTable(blocksOnTable.filter(b => b.id !== PREVIEW_BLOCK_ID));
        console.log("prevBlock removed");
    }, [blocksAtField, blocksOnTable]);

    /**
     * プレビューブロックを表示する
     */
    const showPrevBlock = useCallback((startAt: Time, originalSource: TimeBlockSource) => {
        setPrevBlockSource(createPrevBlockSorce(startAt, originalSource));
        setBlocksOnTable([...blocksOnTable, createPrevBlockSorce(startAt, originalSource)]);
        setPrevPointTime(startAt);
        console.log("prevBlock shown");
    }, [blocksOnTable]);

    /**
     * プレビューブロックを移動する
     */
    const movePrevBlock = useCallback((startAt: Time) => {
        // エラー処理
        if (!prevBlockSource) {
            console.log("prevBlockSource is null");
            return;
        }
        if (prevPointTime === null) {
            console.log("prevPointTime is null");
            return;
        };

        // カーソル移動時でも, 同じ時刻の範囲ならば何もしない(負荷軽減)
        if (prevPointTime.toMinutes() === startAt.toMinutes()) return;

        const movedPrevBlockSource: TimeBlockSource = {...prevBlockSource, startAt};
        setPrevBlockSource(movedPrevBlockSource);
        setBlocksOnTable(blocksOnTable.map(b => b.id === PREVIEW_BLOCK_ID ? movedPrevBlockSource : b));
        setPrevPointTime(startAt);
    }, [prevBlockSource, prevPointTime, blocksOnTable]);

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
            if (!isOver) return;

            const cursorTime = pointToTime(event.active.rect.current.translated.top - rect.current.top);
            // カーソル操作時, そのカーソルに対応した時刻を出力するテスト用のコード
            // テスト時に便利なため残しておく
            // console.log(`cursorTime: ${cursorTime}`);

            movePrevBlock(cursorTime);
        },
        onDragOver(event) {
            // ドラッグオーバー開始時にはプレビューブロックを表示
            if (event.over) {
                if (!rect?.current?.top || !event.active?.rect?.current?.translated || !event.active.data.current) {
                    console.log("Invalid event");
                    return;
                };
                const cursorTime = pointToTime(event.active.rect.current.translated.top - rect.current.top);
                showPrevBlock(cursorTime, event.active.data.current.source);
                return;
            }
            // ドラッグオーバー終了時にはプレビューブロックを削除
            removePrevBlock();
        },
        onDragEnd(e) {
            if (!e.active?.data.current) return;
            const originalSource: TimeBlockSource = e.active.data.current.source;
            const movedBlockId = originalSource.id;
            // removePrevBlock()メソッドでのリスト更新処理が上書きされるため, 必ずプレビューブロックも削除する必要がある？
            const filteredBlocks = blocksOnTable.filter(block => block.id !== movedBlockId && block.id !== PREVIEW_BLOCK_ID);
      
            removePrevBlock();

            if (e.over && prevBlockSource) {
                setBlocksAtField(blocksAtField.filter(block => block.id !== movedBlockId));
                setBlocksOnTable([
                    ...filteredBlocks, 
                    {...prevBlockSource, id: movedBlockId}
                ]);
                console.log("Placed");
            // タイムテーブル上からブロック領域へ移動させた場合の処理
            } else if (originalSource.status === "PLACED") {
                setBlocksOnTable(filteredBlocks);
                setBlocksAtField([
                    ...blocksAtField,
                    {...originalSource, id: movedBlockId, status: "HOLD"},
                ]);
                console.log("Held");
            }
        },
        onDragCancel() {
            console.log("Dragging Cancelled");
            removePrevBlock();
        },
    });

    /**
     * タイムスケジュール上にて, ブロックに重複が発生しているかどうかによってブロックを  
     * グルーピングし, 分割して表示するための関数.
     */
    const blocksOnTableSorted = useCallback(() => {
        /**
         * ２つのブロックが時間軸上で重複しているかどうか比較し, 結果を返す関数
         * 
         * @param block1 重複しているかどうか比較するブロック1
         * @param block2 重複しているかどうか比較するブロック2
         * @returns 重複しているかどうか. している場合に `true` を返す
         */
        const isConflict = (block1: TimeBlockSource, block2: TimeBlockSource) => {
            type startAndEnd = {start: Time, end: Time};
            const b1: startAndEnd = {start: block1.startAt!, end: new Time(block1.startAt!.toMinutes() + block1.width)};
            const b2: startAndEnd = {start: block2.startAt!, end: new Time(block2.startAt!.toMinutes() + block2.width)};
            return b1.start < b2.end && b1.end > b2.start;
        }

        
        // 衝突が起こっているブロック同士をグルーピング
        let blockGroups: TimeBlockSource[][] = [];
        let prevBlock: TimeBlockSource | null = null;
        let prevGroup: TimeBlockSource[] = [];
        for(const block of blocksOnTable.sort((b1, b2) => b1.startAt!.toMinutes() - b2.startAt!.toMinutes())){
            if (!prevBlock) {
                prevBlock = block;
                prevGroup = [block];
                continue;
            }
            if (isConflict(prevBlock, block)) {
                prevGroup = [...prevGroup, block];
            } else {
                blockGroups = [...blockGroups, prevGroup];
                prevGroup = [block];
            }
            prevBlock = block;
        }
        if (prevGroup.length > 0) {
            blockGroups = [...blockGroups, prevGroup];
        }
        blockGroups.forEach(group => group.forEach(block => console.log(block.id)));
        console.log(`blockgroups len: ${blockGroups.length}`);
        blockGroups.forEach(g => console.log(g.length));
        console.log(`blockGroups: ${blockGroups}`)

        // 衝突が起こっているかどうかによって分割したタイムブロックのノードのリストを作成
        let blockNodes: ReactElement[] = [];
        for(const group of blockGroups) {
            let columns: TimeBlockSource[][] = [];
            for(const block of group) {
                for(let i = 0; i < group.length; i++) {
                    if (!columns[i]) {
                        columns[i] = [block];
                        break;
                    }
                    if (columns[i].some(b => isConflict(b, block))) continue;
                    columns[i] = [...columns[i], block];
                }
            }
            columns.forEach((col, index) => {
                blockNodes = [
                    ...blockNodes,
                    ...col.map(b => <TimeBlock key={b.id} source={b} conlumnIndex={index} maxColumnIndex={columns.length}/>)
                ];
            });
        }
        return blockNodes;
    }, [blocksOnTable]);

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
            {blocksOnTableSorted()}
            {prevBlockSource && <TimeBlock source={prevBlockSource} />}
        </Box>
    )
}


const TimeTable: FC<{source: TimeTableSource}> = ({source}) => {

    return (
        <Box
            sx={{
                overflowY: "scroll",
                overflowX: "hidden",
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
