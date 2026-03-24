import { useContext } from "react"
import BlockRepositories from "../contexts/BlockRepositories"
import { Paper, Grid } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";
import { TEMPLATE_BLOCKS_AREA_ID } from "../static/droppableId";
import TemplateBlock from "./TemplateBlock";


const TemplateBlockArea = () => {
    const {
        templateBlocks,
    } = useContext(BlockRepositories);

    const {
        setNodeRef,
    } = useDroppable({
        id: TEMPLATE_BLOCKS_AREA_ID,
    });

    return (
        <Paper
            ref={setNodeRef}
            sx={{
                height: "100%",
                width: "100%",
                padding: 1,
                backgroundColor: "lightblue",
                overflowY: "scroll",
            }}
        >
            <Grid container spacing={1}>
                {templateBlocks.map(b => (
                    <Grid key={b.clientId} size={6}>
                        <TemplateBlock source={b} />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    )
}

export default TemplateBlockArea;