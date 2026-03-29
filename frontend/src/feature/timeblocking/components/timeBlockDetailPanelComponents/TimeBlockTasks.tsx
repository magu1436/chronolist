import { useCallback, type FC } from "react";
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";

import type { TimeBlockTask } from "../../types/blockSourceTypes";
import EditableText from "@/components/EditableText";


type TasksProps = {
    tasks: TimeBlockTask[],
    setTasks: (tasks: TimeBlockTask[]) => void
};

const TimeBlockTasks: FC<TasksProps> = ({ tasks, setTasks }) => {

    const handleAddTask = useCallback(() => {
        setTasks([...tasks, { clientId: uuidv4(), title: "new Task" }]);
    }, [tasks, setTasks]);
    
    return (
        <>
            <Stack>
                <Divider orientation={"horizontal"} textAlign="left" flexItem>タスク</Divider>
                <List>
                    {tasks.map((task) => (
                        <ListItem key={`block-task-${task.clientId}`}>
                            <EditableText value={task.title} onChange={(value) => setTasks(tasks.map(t => t.clientId === task.clientId ? {...t, title: value} : t))} />
                        </ListItem>
                    ))}
                    <ListItemButton onClick={handleAddTask}>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText>タスクを追加</ListItemText>
                    </ListItemButton>
                </List>
            </Stack>
        </>
    )
};

export default TimeBlockTasks;