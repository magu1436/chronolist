package com.magu1436.chronolist.login.Handler;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import java.io.IOException;

/**
 * ログイン失敗時に 401 Unauthorized ステータスのみを返却するハンドラ
 */
public class CustomFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, 
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException {
        // パスワード間違いなどの際、401 Unauthorized という「合図」だけ送る
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    }
}
