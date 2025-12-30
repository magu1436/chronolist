import type { FC } from "react";

const Buttons: FC<{
    onRegisterButtonClicked: () => void,
    onDeleteButtonClicked: () => void,
}> = ({ onRegisterButtonClicked, onDeleteButtonClicked }) => {
    return (
        <div className="d-flex">
            <button type="button" className="btn btn-primary" onClick={onRegisterButtonClicked}>新規作成</button>
            <button type="button" className="btn btn-danger" onClick={onDeleteButtonClicked}>完了済みのタスクを削除</button>
        </div>
    );
};

export default Buttons;