import { defaultDropAnimationSideEffects, DragOverlay, useDndMonitor } from "@dnd-kit/core"
import { useRef, type FC, type ReactElement, useContext, useCallback, useState } from "react"

import type { TimeBlockSource } from "../types/blockSourceTypes";
import { Time } from "@/utils/time";
import TimeTableConfigure from "../contexts/TimeTableConfigure";
import { PREVIEW_BLOCK_ID } from "../static/previewBlock";
import BlockRepositories from "../contexts/BlockRepositories";
import TimeBlock from "./TimeBlock";

const testBlocksOnTable: TimeBlockSource[] = [
    {
        id: 3,
        timeTableId: 1,
        status: "PLACED",
        relatedSchedle: null,
        width: 90,
        startAt: new Time("1:30"),
        tasks: [],
        color: "red",
        title: "test block 3",
    },
    {
        id: 4,
        timeTableId: 1,
        status: "PLACED",
        relatedSchedle: null,
        width: 60,
        startAt: new Time("2:30"),
        tasks: [],
        color: "blue",
        title: "test block 4",
    }
];
const testBlocksAtField: TimeBlockSource[] = [{
        id: 1,
        timeTableId: 1,
        status: "HOLD",
        relatedSchedle: null,
        width: 120,
        startAt: null,
        tasks: [],
        color: "red",
        title: "test block 1 test block 2 test block 3 test block 4",
    },
    {
        id: 2,
        timeTableId: 1,
        status: "HOLD",
        relatedSchedle: null,
        width: 150,
        startAt: null,
        tasks: [],
        color: "red",
        title: "test block 2",
    }
];

type BlockAvailableProps = {
    children?: ReactElement,
}

/**
 * ブロックを配置可能なエリアの外枠.  
 * このコンポーネント内でブロックがドラッグ・ドロップされた際の処理を行う.  
 */
const BlockAvailable: FC<BlockAvailableProps> = ({children}) => {

    const [ blocksOnTable, setBlocksOnTable ] = useState<TimeBlockSource[]>(testBlocksOnTable);
    const [ blocksAtField, setBlocksAtField ] = useState<TimeBlockSource[]>(testBlocksAtField);

    const prevPointTimeRef = useRef<Time | null>(null);
    const prevBlockSource = useRef<TimeBlockSource | null>(null);
    const draggingBlockSource = useRef<TimeBlockSource | null>(null);

    const {
        timeTableId,
        slotHeight,
        slotMinutes,
    } = useContext(TimeTableConfigure);

    const pointToTime = useCallback((relativePointerY: number) => {
        const time = new Time(Math.floor(relativePointerY / slotHeight) * slotMinutes);
        return time;
    }, []);

    const createPrevBlockSorce = useCallback((startAt: Time, originalSource: TimeBlockSource): TimeBlockSource => {
        console.log(`original: ${originalSource}`);
        return {
            ...originalSource,
            id: PREVIEW_BLOCK_ID,
            timeTableId: timeTableId,
            status: "PLACED",
            startAt,
        };
    }, []);
    
    /**
     * プレビューブロックを削除する
     */
    const removePrevBlock = useCallback(() => {
        prevPointTimeRef.current = null;
        prevBlockSource.current = null;
        setBlocksOnTable((blocks) => blocks.filter(b => b.id !== PREVIEW_BLOCK_ID));
        console.log("prevBlock removed");
    }, [blocksAtField, blocksOnTable]);

    /**
     * プレビューブロックを表示する
     */
    const showPrevBlock = useCallback((startAt: Time, originalSource: TimeBlockSource) => {
        prevBlockSource.current = createPrevBlockSorce(startAt, originalSource);
        setBlocksOnTable((blocks) => [
            ...blocks.filter(b => b.id !== originalSource.id),
            createPrevBlockSorce(startAt, originalSource)
        ]);
        prevPointTimeRef.current = startAt;
        console.log("prevBlock shown");
    }, []);

    /**
     * プレビューブロックを移動する
     */
    const movePrevBlock = useCallback((startAt: Time) => {
        // エラー処理
        if (!prevBlockSource.current) {
            console.log("prevBlockSource is null");
            return;
        }
        if (prevPointTimeRef.current === null) {
            console.log("prevPointTime is null");
            return;
        };

        // カーソル移動時でも, 同じ時刻の範囲ならば何もしない(負荷軽減)
        if (prevPointTimeRef.current.toMinutes() === startAt.toMinutes()) return;

        const movedPrevBlockSource: TimeBlockSource = {...prevBlockSource.current, startAt};
        setBlocksOnTable((blocks) => blocks.map(b => b.id === PREVIEW_BLOCK_ID ? movedPrevBlockSource : b));
        prevBlockSource.current = movedPrevBlockSource;
        prevPointTimeRef.current = startAt;
    }, []);

    useDndMonitor({
        onDragStart(event) {
            if (!event.active?.data?.current) return;
            draggingBlockSource.current = event.active.data.current.source as TimeBlockSource;
        },
        onDragMove(event) {
            // エラー処理
            if (prevPointTimeRef.current === null) {
                console.log("prevPointTime is null");
                return;
            };
            if (!event.over?.rect.top || !event.active?.rect?.current?.translated || !event.active.data.current) {
                console.log("Invalid event");
                return;
            };

            const cursorTime = pointToTime(event.active.rect.current.translated.top - event.over.rect.top);
            // カーソル操作時, そのカーソルに対応した時刻を出力するテスト用のコード
            // テスト時に便利なため残しておく
            // console.log(`cursorTime: ${cursorTime}`);

            movePrevBlock(cursorTime);
        },
        onDragOver(event) {
            // ドラッグオーバー開始時にはプレビューブロックを表示
            if (event.over) {
                if (draggingBlockSource.current === null) throw new Error("draggingBlockSource is null");
                if (!event.over.rect.top || !event.active?.rect?.current?.translated) {
                    console.log("Invalid event");
                    return;
                };
                const cursorTime = pointToTime(event.active.rect.current.translated.top - event.over.rect.top);
                showPrevBlock(cursorTime, draggingBlockSource.current);
                return;
            }
            // ドラッグオーバー終了時にはプレビューブロックを削除
            removePrevBlock();
        },
        onDragEnd(e) {
            if (draggingBlockSource.current === null) return;
            const movedBlockId: number = draggingBlockSource.current.id;
            const prevSource = prevBlockSource.current;
            removePrevBlock();
            if (e.over && prevSource) {
                setBlocksAtField((blocks) => blocks.filter(block => block.id !== movedBlockId));
                setBlocksOnTable((blocks) => [...blocks, {...prevSource, id: movedBlockId}]);
                console.log("Placed");
            // タイムテーブル上からブロック領域へ移動させた場合の処理
            } else if (draggingBlockSource.current.status === "PLACED") {
                const draggingSource = draggingBlockSource.current;
                setBlocksAtField((blocks) => [
                    ...blocks,
                    {...draggingSource, id: movedBlockId, status: "HOLD", startAt: null},
                ]);
                console.log("Held");
            }
            draggingBlockSource.current = null;
        },
        onDragCancel() {
            console.log("Dragging Cancelled");
            removePrevBlock();
            draggingBlockSource.current = null;
        },
    });

    return (
        <BlockRepositories value={{
            blocksOnTable,
            setBlocksOnTable,
            blocksAtField,
            setBlocksAtField,
        }}>
            {children}
            <DragOverlay
                dropAnimation={{
                    sideEffects: defaultDropAnimationSideEffects({
                        styles: {
                            active: {},
                            dragOverlay: {
                                opacity: "0",
                            }
                        }
                    })
                }}
            >
                {draggingBlockSource.current && <TimeBlock source={draggingBlockSource.current} />}
            </DragOverlay>
        </BlockRepositories>
    )
};

export default BlockAvailable;