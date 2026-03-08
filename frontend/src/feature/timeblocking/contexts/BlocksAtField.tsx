import { createContext } from "react";
import type { TimeBlockSource } from "../types/blockSourceTypes";


const BlocksAtField = createContext<{
    blocksAtField: TimeBlockSource[],
    setBlocksAtField: (blocks: TimeBlockSource[]) => void
}>({
    blocksAtField: [],
    setBlocksAtField: () => {}
});

export default BlocksAtField;