import { defaultDropAnimationSideEffects, DragOverlay, useDndMonitor } from "@dnd-kit/core"
import { useRef, type FC, type ReactElement, useContext, useCallback, useState } from "react"
import { v4 as uuidv4 } from "uuid";

import type { TemplateBlockSource, TimeBlockSource } from "../types/blockSourceTypes";
import { Time } from "@/utils/time";
import TimeTableConfigure from "../contexts/TimeTableConfigure";
import { PREVIEW_BLOCK_ID } from "../static/previewBlock";
import BlockRepositories from "../contexts/BlockRepositories";
import TimeBlockView from "./TimeBlockView";
import { BLOCKS_AREA_ID, TEMPLATE_BLOCKS_AREA_ID, TIMETABLE_ID } from "../static/droppableId";

const testBlocksOnTable: TimeBlockSource[] = [
    {
        id: 3,
        clientId: uuidv4(),
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
        clientId: uuidv4(),
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
        clientId: uuidv4(),
        timeTableId: null,
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
        clientId: uuidv4(),
        timeTableId: null,
        status: "HOLD",
        relatedSchedle: null,
        width: 150,
        startAt: null,
        tasks: [],
        color: "red",
        title: "test block 2",
    }
];

const testTemplateBlocks: TemplateBlockSource[] = [
    {
        id: 1,
        clientId: uuidv4(),
        title: "test template block 1",
        width: 120,
        color: "cyan",
    },
    {
        id: 2,
        clientId: uuidv4(),
        title: "test template block 2",
        width: 150,
        color: "cyan",
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
    const [ templateBlocks, setTemplateBlocks ] = useState<TemplateBlockSource[]>(testTemplateBlocks);

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
            clientId: PREVIEW_BLOCK_ID,
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
        setBlocksOnTable((blocks) => blocks.filter(b => b.clientId !== PREVIEW_BLOCK_ID));
        console.log("prevBlock removed");
    }, [blocksAtField, blocksOnTable]);

    /**
     * プレビューブロックを表示する
     */
    const showPrevBlock = useCallback((startAt: Time, originalSource: TimeBlockSource) => {
        prevBlockSource.current = createPrevBlockSorce(startAt, originalSource);
        setBlocksOnTable((blocks) => [
            ...blocks.filter(b => b.clientId !== originalSource.clientId),
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
        setBlocksOnTable((blocks) => blocks.map(b => b.clientId === PREVIEW_BLOCK_ID ? movedPrevBlockSource : b));
        prevBlockSource.current = movedPrevBlockSource;
        prevPointTimeRef.current = startAt;
    }, []);

    useDndMonitor({
        onDragStart(event) {
            if (!event.active?.data?.current) return;
            draggingBlockSource.current = event.active.data.current.source as TimeBlockSource;
        },
        onDragMove(event) {
            switch (event.over?.id) {
                case TIMETABLE_ID:
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
                    break;
                case BLOCKS_AREA_ID:
                    break;
                case TEMPLATE_BLOCKS_AREA_ID:
                    break;
            }
        },
        onDragOver(event) {
            switch (event.over?.id) {
                case TIMETABLE_ID:
                    // ドラッグオーバー開始時にプレビューブロックを表示
                    if (draggingBlockSource.current === null) throw new Error("draggingBlockSource is null");
                    if (!event.over.rect.top || !event.active?.rect?.current?.translated) {
                        console.log("Invalid event");
                        return;
                    };
                    const cursorTime = pointToTime(event.active.rect.current.translated.top - event.over.rect.top);
                    showPrevBlock(cursorTime, draggingBlockSource.current);
                    break;
                case BLOCKS_AREA_ID:
                    removePrevBlock();
                    break;
                case TEMPLATE_BLOCKS_AREA_ID:
                    removePrevBlock();
                    break;
            }
        },
        onDragEnd(e) {
            if (draggingBlockSource.current === null) {
                throw new Error("draggingBlockSource is null");
            }
            const movedBlockId: string = draggingBlockSource.current.clientId;
            const prevSource = prevBlockSource.current;
            removePrevBlock();
            switch (e.over?.id) {
                case TIMETABLE_ID:
                    if (prevSource === null) throw new Error("prevSource is null");
                    setBlocksAtField((blocks) => blocks.filter(block => block.clientId !== movedBlockId));
                    setBlocksOnTable((blocks) => [...blocks, {...prevSource, clientId: movedBlockId}]);
                    console.log("Placed");
                    break;
                case BLOCKS_AREA_ID:
                    if (!blocksAtField.find(b => b.clientId === movedBlockId)) {
                        const heldBlockSource: TimeBlockSource = {
                            ...draggingBlockSource.current,
                            status: "HOLD",
                            startAt: null,
                            timeTableId: null,
                        };
                        setBlocksAtField((blocks) => [...blocks, heldBlockSource]);
                    };
                    console.log("Held");
                    break;
                case TEMPLATE_BLOCKS_AREA_ID:
                    break;
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
            templateBlocks,
            setTemplateBlocks
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
                {draggingBlockSource.current && <TimeBlockView source={draggingBlockSource.current} sx={{opacity: prevBlockSource.current ? 0 : 1}} />}
            </DragOverlay>
        </BlockRepositories>
    )
};

export default BlockAvailable;