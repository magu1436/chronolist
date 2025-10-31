import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import GetAllResult from "@/feature/tester/components/todolist/getall";


const routesBasic = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/test/todolist/getall" element={<GetAllResult />} />
        </>
    )
);

export default routesBasic;