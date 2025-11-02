import useFetch from "@/utils/fetch";


const DeleteResult = () => {

    const targetTaskId = 0;

    const {isLoading, error} = useFetch(
        `todolist/delete/${targetTaskId}`,
        "DELETE",
    );

    if (isLoading) return (<h1>Loading...</h1>);

    if (error) return (
        <>
            <h1>URLに含めたID</h1>
            <div>id: {targetTaskId}</div>
            <h1>Some error happend!</h1>
            <div className="m-2">{error.message}</div>
            <div className="m-2">{error.stack}</div>
            <div className="m-2">{error.name}</div>
        </>
    );

    return (
        <>
            <h1>URLに含めたID</h1>
            <div>id: {targetTaskId}</div>
            <h1>Delete Complated!</h1>
        </>
    );
};

export default DeleteResult;