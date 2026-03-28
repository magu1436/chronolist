import { type FC } from "react";
import { useDraggable } from "@dnd-kit/core";

import type { TemplateBlockSource, TimeBlockSource } from "../types/blockSourceTypes"
import TimeBlockView from "./TimeBlockView";


type TemplateBlockProps = {
    source: TemplateBlockSource,
};

const TemplateBlock: FC<TemplateBlockProps> = ({source}) => {

    const blockSource: TimeBlockSource = {
        ...source,
        status: "HOLD",
        relatedSchedle: null,
        startAt: null,
        tasks: [],
        timeTableId: null,
        fromTemplateBlockSource: source,
    }
    
    const {
        setNodeRef,
        attributes,
        listeners,
    } = useDraggable({
        id: source.clientId,
        data: { source: blockSource },
    });

    return (
        <TimeBlockView
            source={blockSource}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
        />
    )
};

export default TemplateBlock;