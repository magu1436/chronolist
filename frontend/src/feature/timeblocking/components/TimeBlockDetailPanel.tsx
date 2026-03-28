import { Dialog, Stack } from "@mui/material"
import Title from "./timeBlockDetailPanelComponents/Title"
import { useCallback, useContext, useEffect, useState, type FC } from "react";
import SelectedTimeBlockClientId from "../contexts/SelectedTimeBlockClientId";
import BlockRepositories from "../contexts/BlockRepositories";


type TimeBlockDetailPanelProps = {
    open: boolean,
    setOpen: (open: boolean | ((prevState: boolean) => boolean)) => void,
};

const TimeBlockDetailPanel: FC = () => {

    const {
        blocksOnTable,
        setBlocksOnTable,
        blocksAtField,
        setBlocksAtField,
    } = useContext(BlockRepositories);

    const {
        selectedTimeBlockId,
        setSelectedTimeBlockClientId,
    } = useContext(SelectedTimeBlockClientId);

    const [ open, setOpen ] = useState(false);

    useEffect(() => {
        setOpen(selectedTimeBlockId !== null);
    }, [selectedTimeBlockId]);

    const handleClose = useCallback(() => {
        setSelectedTimeBlockClientId(null);
    }, []);

    const block = blocksOnTable.find(b => b.clientId === selectedTimeBlockId) || blocksAtField.find(b => b.clientId === selectedTimeBlockId);
    const [ title, setTitle ] = useState(block?.title || "");


    return (
        <Dialog
            open={open}
            onClose={handleClose} 
            sx={{
                height: "100%",
            }
        }>
            <Stack>
                <Title text={title} setText={setTitle} />
            </Stack>
        </Dialog>
    )
};

export default TimeBlockDetailPanel;