import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import ToDoListTestPage from "@/feature/tester/components/toDoListIndex";
import TesterPage from "@/feature/tester";
import SchedulerTestPage from "@/feature/tester/components/schedulerIndex";
import ToDoListPage from "@/feature/todolist";
import SchedulerPage from "@/feature/schesuler";
import HomePage from "@/feature/home";
import LoginPage from "@/feature/login";
import SingnUpPage from "@/feature/signup";


const routesBasic = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<HomePage />} />
            <Route path="/test" element={<TesterPage />} />
            <Route path="/test/todolist" element={<ToDoListTestPage />} />
            <Route path="/test/scheduler" element={<SchedulerTestPage />} />
            <Route path="/todolist" element={<ToDoListPage />} />
            <Route path="/scheduler" element={<SchedulerPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SingnUpPage />} />
        </>
    )
);

export default routesBasic;