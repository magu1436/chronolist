import EditableNumberText from "@/components/EditableNumberText";
import type { FC } from "react";


type WidthProps = {
    width: number;
    setWidth: (width: number) => void;
};

const Width: FC<WidthProps> = ({ width, setWidth }) => {
    return (
        <EditableNumberText value={width} onChange={setWidth} />
    );
};

export default Width;