import { type FC } from "react";
import { useDraggable } from "@dnd-kit/core";

import type { TemplateBlockSource, TimeBlockSource } from "../types/blockSourceTypes"
import TimeBlockView from "./TimeBlockView";


type TemplateBlockProps = {
    source: TemplateBlockSource,
};

const TemplateBlock: FC<TemplateBlockProps> = ({source}) => {
    
    const {
        setNodeRef,
        attributes,
        listeners,
    } = useDraggable({
        id: source.id,
        data: { source },
    });

    const blockSource: TimeBlockSource = {
        ...source,
        status: "HOLD",
        relatedSchedle: null,
        startAt: null,
        tasks: [],
        timeTableId: null,
    }

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