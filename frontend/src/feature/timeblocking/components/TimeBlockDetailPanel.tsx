import { Modal, Stack, Box, type SxProps } from "@mui/material"
import Title from "./timeBlockDetailPanelComponents/Title"
import { useCallback, useContext, useEffect, useState, type FC } from "react";
import SelectedTimeBlockClientId from "../contexts/SelectedTimeBlockClientId";
import BlockRepositories from "../contexts/BlockRepositories";
import type { TimeBlockSource, TimeBlockTask } from "../types/blockSourceTypes";
import type { Time } from "@/utils/time";
import TimeRange from "./timeBlockDetailPanelComponents/TimeRange";
import Width from "./timeBlockDetailPanelComponents/Width";
import TimeBlockTasks from "./timeBlockDetailPanelComponents/TimeBlockTasks";

const style: SxProps = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
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

    const handleSetTime = useCallback((time: Time) => {
        const editedBlock = block && { ...block, startAt: time };
        setBlock(editedBlock);
        editedBlock && reflectBlockToRepository(editedBlock);
    }, [block]);

    const handleSetWidth = useCallback((width: number) => {
        const editedBlock = block && { ...block, width: width };
        setBlock(editedBlock);
        editedBlock && reflectBlockToRepository(editedBlock);
    }, [block]);

    const handleAddTasks = useCallback((tasks: TimeBlockTask[]) => {
        const editedBlock = block && { ...block, tasks: [...tasks] };
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
                <Stack spacing={3}>
                    <Title text={block?.title} setText={handleSetText} />
                    {block?.startAt && <TimeRange width={block?.width} startAt={block?.startAt || undefined} setStartAt={handleSetTime} />}
                    <Width width={block?.width || 0} setWidth={handleSetWidth} />
                    {block && <TimeBlockTasks tasks={block.tasks} setTasks={handleAddTasks} />}
                </Stack>
            </Box>
        </Modal>
    )
};

export default TimeBlockDetailPanel;