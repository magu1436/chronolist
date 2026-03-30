import myAxios from "@/utils/axios";
import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";


const LoginPage = () => {

    const [serchParams] = useSearchParams();

    let hasError = serchParams.has("error");
    const hasLogout = serchParams.has("logout");

    const [ loginId, setLoginId ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");

    const handleLogin = async () => {
        console.log("---ログイン処理を開始----------------------------------------")
        try {
            const res = await myAxios({
                url: "/login",
                method: "post",
                data: { loginId, password},
                withCredentials: true,
            });

            // ログイン成功時処理
            console.log("ログイン成功");
            console.log(`token: ${res.data.token}`);

        } catch (err) {
            if (axios.isAxiosError(err)) {
                const status = err.response?.status;

                // 入力値によるエラー
                if (status === 401) {
                    console.log("ログインIDまたはパスワードが不正です");
                    hasError = true;
                }
            } else {
                console.log("不明なエラー");
            }
        }
        console.log("---ログイン処理を終了----------------------------------------")
    }
    
    return (
        <>
            <h1>ログイン画面</h1>

            {hasError && (<div style={{color: "red"}}>usernameまたはpasswordが違います</div>)}
            {hasLogout && (<div style={{color: "blue"}}>ログアウトしました</div>)}

            <form action="http://localhost:8080/login" method="post">
                <div>
                    <label>ログインID</label>
                    <input type="text" name="login_id" value={loginId} required onChange={(e) => setLoginId(e.target.value)} />
                </div>
                <div>
                    <label>パスワード</label>
                    <input type="password" name="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button variant="primary" type="submit">フォームログイン</Button>
                <Button variant="success" onClick={handleLogin}>APIログイン</Button>
            </form>
        </>
    )
}

export default LoginPage;