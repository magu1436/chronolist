import { useSearchParams } from "react-router-dom"


const LoginPage = () => {

    const [serchParams] = useSearchParams();

    const hasError = serchParams.has("error");
    const hasLogout = serchParams.has("logout");
    
    return (
        <>
            <h1>ログイン画面</h1>

            {hasError && (<div style={{color: "red"}}>usernameまたはpasswordが違います</div>)}
            {hasLogout && (<div style={{color: "blue"}}>ログアウトしました</div>)}

            <form action="http://localhost:8080/login" method="post">
                <div>
                    <label>ログインID</label>
                    <input type="text" name="login_id" required />
                </div>
                <div>
                    <label>パスワード</label>
                    <input type="password" name="password" required />
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default LoginPage;