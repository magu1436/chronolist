
import type { DueApi } from "../../types/todolist/api";
import type { DueKind } from "../../types/todolist/statics";

class Due {

    dueKind: DueKind;
    dueAt?: Date;

    constructor(dueKind: DueKind, dueAt?: Date){
        this.dueKind = dueKind;
        this.dueAt = dueAt;
    }

    /**
     * APIから受け取った期日から `Due` オブジェクトを作成するメソッド.
     * @param due APIから受け取ったタスクの期日
     * @returns 作成された `Due`
     */
    static createFromDueApi(due: DueApi) {
        const dueKind = due.dueKind;
        let dueAt: Date | undefined = undefined;

        switch(dueKind){
            case "NONE":
                break;
            case "DATE":
                dueAt = new Date(dueKind);
                break;
            case "DATETIME":
                dueAt = new Date(`${due.date} ${due.time}`);
                break;
            default:
                throw new Error(`Failed creating date. Recieved values "date: ${due.date}, time: ${due.time}"`);
        }

        return new Due(dueKind, dueAt);
    }
}

export default Due;