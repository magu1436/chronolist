import { createContext } from "react";

import type { TimeBlockSource } from "../types/blockSourceTypes";

/**
 * タイムテーブルやブロック領域内の全てのブロックを管理するコンテキスト
 */
const BlockRepositories = createContext<{
    blocksOnTable: TimeBlockSource[],
    setBlocksOnTable: (blocks: TimeBlockSource[] | ((blocks: TimeBlockSource[]) => TimeBlockSource[])) => void
    blocksAtField: TimeBlockSource[],
    setBlocksAtField: (blocks: TimeBlockSource[] | ((blocks: TimeBlockSource[]) => TimeBlockSource[])) => void
}>({
    blocksOnTable: [],
    setBlocksOnTable: () => { return; },
    blocksAtField: [],
    setBlocksAtField: () => { return; },
});

export default BlockRepositories;