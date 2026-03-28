import { createContext } from "react";

const SelectedTimeBlockId = createContext<{
    selectedTimeBlockId: number | null,
    setSelectedTimeBlockId: ((block: number | null | ((block: number | null) => void)) => void)
}>({
    selectedTimeBlockId: null,
    setSelectedTimeBlockId: () => { },
});

export default SelectedTimeBlockId;