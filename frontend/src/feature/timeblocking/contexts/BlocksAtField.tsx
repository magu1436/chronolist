import { createContext } from "react";
import type { TimeBlockSource } from "../types/blockSourceTypes";


const BlocksAtField = createContext<[
    TimeBlockSource[],
    (blocks: TimeBlockSource[]) => void,
]>([[], () => {}]);

export default BlocksAtField;