import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import ToDoListTestPage from "@/feature/tester/components/toDoListIndex";
import TesterPage from "@/feature/tester";


const routesBasic = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<TesterPage />} />
            <Route path="/test" element={<TesterPage />} />
            <Route path="/test/todolist" element={<ToDoListTestPage />} />
        </>
    )
);

export default routesBasic;