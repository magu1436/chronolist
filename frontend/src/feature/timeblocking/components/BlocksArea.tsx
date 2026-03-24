import { useContext } from "react";
import { useDroppable } from "@dnd-kit/core";

import BlockRepositories from "../contexts/BlockRepositories";
import TimeBlock from "./TimeBlock";
import { BLOCKS_AREA_ID } from "../static/droppableId";
import { Paper, Grid } from "@mui/material";


const BlocksArea = () => {
    const {
        blocksAtField,
    } = useContext(BlockRepositories);

    const {
        setNodeRef,
    } = useDroppable({
        id: BLOCKS_AREA_ID,
    })

    return (
        <>
            <Paper
                ref={setNodeRef}
                sx = {{
                    height: "100%",
                    width: "100%",
                    padding: 1,
                    backgroundColor: "lightgreen",
                    overflowY: "scroll",
                }}
            >
                <Grid container spacing={1}>
                    {blocksAtField.map(b => (
                        <Grid key={b.clientId} size={6}>
                            <TimeBlock key={b.clientId} source={b} />
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </>
    )
};

export default BlocksArea;