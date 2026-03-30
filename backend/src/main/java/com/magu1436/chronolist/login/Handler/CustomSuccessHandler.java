package com.magu1436.chronolist.login.Handler;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import java.io.IOException;

/**
 * ログイン成功時に 200 OK ステータスのみを返却するハンドラ
 */
public class CustomSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, 
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
                                            
        response.setStatus(HttpServletResponse.SC_OK);
    }
}