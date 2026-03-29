import { Modal, Stack, Box, type SxProps } from "@mui/material"
import Title from "./timeBlockDetailPanelComponents/Title"
import { useCallback, useContext, useEffect, useState, type FC } from "react";
import SelectedTimeBlockClientId from "../contexts/SelectedTimeBlockClientId";
import BlockRepositories from "../contexts/BlockRepositories";
import type { TimeBlockSource } from "../types/blockSourceTypes";

const style: SxProps = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const TimeBlockDetailPanel: FC = () => {

    const [ block, setBlock ] = useState<TimeBlockSource | undefined>(undefined);

    const {
        blocksOnTable,
        setBlocksOnTable,
        blocksAtField,
        setBlocksAtField,
    } = useContext(BlockRepositories);

    const reflectBlockToRepository = useCallback((block: TimeBlockSource) => {
        switch (block.status) {
            case "PLACED":
                setBlocksOnTable((blocks) => blocks.map(b => b.clientId === block.clientId ? block : b));
                break;
            case "HOLD":
                setBlocksAtField((blocks) => blocks.map(b => b.clientId === block.clientId ? block : b));
                break;
        }
    }, []);

    const {
        selectedTimeBlockId,
        setSelectedTimeBlockClientId,
    } = useContext(SelectedTimeBlockClientId);

    const [ open, setOpen ] = useState(false);

    useEffect(() => {
        setOpen(selectedTimeBlockId !== null);
        const selectedBlock = blocksOnTable.find(b => b.clientId === selectedTimeBlockId) || blocksAtField.find(b => b.clientId === selectedTimeBlockId);
        setBlock(selectedBlock);
    }, [selectedTimeBlockId]);

    const handleClose = useCallback(() => {
        setSelectedTimeBlockClientId(null);
    }, []);

    const handleSetText = useCallback((text: string) => {
        const editedBlock = block && { ...block, title: text };
        setBlock(editedBlock);
        editedBlock && reflectBlockToRepository(editedBlock);
    }, [block]);


    return (
        <Modal
            open={open}
            onClose={handleClose} 
        >
            <Box
                sx={style}>
                <Stack>
                    <Title text={block?.title} setText={handleSetText} />
                </Stack>
            </Box>
        </Modal>
    )
};

export default TimeBlockDetailPanel;