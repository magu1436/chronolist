import { useCallback, useContext } from "react"
import SelectedTimeBlockId from "../../contexts/SelectedTimeBlockId";
import BlockRepositories from "../../contexts/BlockRepositories";
import EditableText from "@/components/EditableText";


const Title = () => {
    const {
        selectedTimeBlockId,
    } = useContext(SelectedTimeBlockId);

    const {
        blocksOnTable,
        setBlocksOnTable,
        blocksAtField,
        setBlocksAtField,
    } = useContext(BlockRepositories);

    const title = (blocksOnTable.find(block => block.id === selectedTimeBlockId) || blocksAtField.find(block => block.id === selectedTimeBlockId))?.title;

    const handleOnChange = useCallback((text: string) => {
        const newBlockOnTable = blocksOnTable.find(block => block.id === selectedTimeBlockId);
        if (newBlockOnTable) {
            setBlocksOnTable(blocksOnTable.map(block => block.id === selectedTimeBlockId ? { ...block, title: text } : block));
        };
        const newBlockAtField = blocksAtField.find(block => block.id === selectedTimeBlockId);
        if (newBlockAtField) {
            setBlocksAtField(blocksAtField.map(block => block.id === selectedTimeBlockId ? { ...block, title: text } : block));
        };
    }, []);

    return (
        <>
            <EditableText value="title" onChange={handleOnChange} />
        </>
    )
};

export default Title;