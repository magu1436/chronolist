import type { ToDoTask } from "@/types/todolist/todotask";
import { createContext } from "react";



export const SelectedToDoTaskContext = createContext<{ task: ToDoTask | null, set: (task: ToDoTask) => void } | null>(null);