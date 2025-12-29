import { createContext } from "react";

import type { ToDoTask } from "@/types/todolist/todotask";

const AllToDoTasksContext = createContext<ToDoTask[]>([]);

export default AllToDoTasksContext;