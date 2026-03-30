import classNames from "classnames"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


const HomePage = () => {

    const nav = useNavigate();

    return (
        <div className={classNames("d-flex", "flex-column", "align-items-center")}>
            <Button className="m-1" onClick={() => {nav("/signup")}}>新規登録</Button>
            <Button className="m-1" onClick={() => {nav("/login")}}>ログイン</Button>
            <Button className="m-1" onClick={() => {nav("/todolist")}}>ToDoリスト</Button>
            <Button className="m-1" onClick={() => {nav("/scheduler")}}>スケジューラ</Button>
            <Button className="m-1" onClick={() => {nav("/timeblocking")}}>タイムブロッキング</Button>
            <Button className="m-1" onClick={() => {nav("/test")}}>テスター</Button>
        </div>
    )
}

export default HomePage;