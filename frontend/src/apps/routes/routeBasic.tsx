import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import ToDoListTestPage from "@/feature/tester/components/toDoListIndex";
import TesterPage from "@/feature/tester";
import SchedulerTestPage from "@/feature/tester/components/schedulerIndex";


const routesBasic = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<TesterPage />} />
            <Route path="/test" element={<TesterPage />} />
            <Route path="/test/todolist" element={<ToDoListTestPage />} />
            <Route path="/test/scheduler" element={<SchedulerTestPage />} />
        </>
    )
);

export default routesBasic;