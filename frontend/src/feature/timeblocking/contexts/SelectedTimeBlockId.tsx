import { createContext } from "react";

const SelectedTimeBlockId = createContext<{
    selectedTimeBlockId: number | null,
    setSelectedTimeBlockId: number | ((block: number | null) => void)
}>({
    selectedTimeBlockId: null,
    setSelectedTimeBlockId: () => { },
});

export default SelectedTimeBlockId;