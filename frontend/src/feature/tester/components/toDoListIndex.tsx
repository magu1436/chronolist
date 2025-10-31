import { useState, type ReactNode } from "react";
import { Button } from "react-bootstrap";
import GetAllResult from "./todolist/getall";


const ToDoListTestPage = () => {
    const [apiResult, setApiResult] = useState<ReactNode>();

    const apis = {
        getAll: <GetAllResult />,
    }

    return (
        <>
            {Object.keys(apis).map(f => {
                return (
                    <Button className="m-2" onClick={() => {setApiResult(apis[f])}} key={f}>{f}</Button>
                );
            })}
            {apiResult}
        </>
    );
}

export default ToDoListTestPage;