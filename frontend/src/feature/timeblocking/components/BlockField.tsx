import { useContext } from "react";
import BlockRepositories from "../contexts/BlockRepositories";
import TimeBlock from "./TimeBlock";


const BlockField = () => {
    const {
        blocksAtField,
    } = useContext(BlockRepositories);

    return (
        <>
            {blocksAtField.map(b => (
                <TimeBlock key={b.id} source={b} />
            ))}
        </>
    )
};

export default BlockField;