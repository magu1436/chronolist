import TimeBlock from "./components/TimeBlock"


const TimeBlockingPage = () => {
    return (
        <TimeBlock source={{
            id: 1,
            timeTableId: 1,
            status: "HOLD",
            relatedSchedle: null,
            width: 1,
            startAt: null,
            tasks: [],
            color: "red",
            title: "test block 1 test block 2 test block 3 test block 4 test block 5 test block 6 test block 7 test block 8 test block 9 test block 10 test block 1 test block 2 test block 3 test block 4 test block 5 test block 6 test block 7 test block 8 test block 9 test block 10 test block 1 test block 2 test block 3 test block 4 test block 5 test block 6 test block 7 test block 8 test block 9 test block 10",
        }} />
    )
}

export default TimeBlockingPage;