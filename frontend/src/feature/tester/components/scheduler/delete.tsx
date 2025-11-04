import useFetch from "@/utils/fetch";
import ErrorDisplay from "../error";


const DeleteResult = () => {

    const targetId: number = 0;

    const {isLoading, error} = useFetch(
        `scheduler/delete/${targetId}`,
        "DELETE",
    );

    if (isLoading) return (<h1>Loading...</h1>);

    if (error) return (
        <>
            <h1>Target ID</h1>
            <div>id: {targetId}</div>
            <ErrorDisplay err={error} />
        </>
    );

    return (
        <>
            <h1>Target ID</h1>
            <div>id: {targetId}</div>
            <h1>Completed!</h1>
        </>
    );
}

export default DeleteResult;