import { useCallback, type FC } from "react";
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";

import type { TimeBlockTask } from "../../types/blockSourceTypes";
import EditableText from "@/components/EditableText";
import { register } from "../../api/timeBlockTaskApi";


type TasksProps = {
    tasks: TimeBlockTask[],
    blockId: number,
    setTasks: (tasks: TimeBlockTask[]) => void
};

/**
 * タイムブロックのタスクを表示するコンポーネント
 */
const TimeBlockTasks: FC<TasksProps> = ({ tasks, blockId, setTasks }) => {

    const handleAddTask = useCallback( async () => {
        const newTask: TimeBlockTask = { clientId: uuidv4(), timeBlockId: blockId, title: "new Task" };
        setTasks([...tasks, newTask]);
        const id = await register(newTask);
        newTask.id = id;
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

                    {/* 新規タスクを追加するボタン */}
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