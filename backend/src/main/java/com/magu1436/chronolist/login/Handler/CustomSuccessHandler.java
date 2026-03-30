package com.magu1436.chronolist.login.Handler;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;

import java.io.IOException;

/**
 * 認証成功時に認証情報を {@link SecurityContext} と HTTP セッションへ保存し、
 * リダイレクトせず HTTP 200 を返すハンドラ。主に API や SPA のログインに利用する。
 */
public class CustomSuccessHandler implements AuthenticationSuccessHandler {

    /**
     * 認証結果を新しい {@link SecurityContext} に格納し、スレッドローカルおよび
     * セッションへ保存した上でレスポンスコードを 200 に設定する。
     *
     * @param request        現在の HTTP リクエスト（セッション取得・作成に利用）
     * @param response       ステータス 200 を設定するレスポンス
     * @param authentication ログイン成功後に渡される認証情報
     * @throws IOException   レスポンス書き込みに失敗した場合
     */
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        // 認証情報を保持する空のコンテキストを作成し、認証情報をセット
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);

        // スレッドローカルのコンテキストとして登録
        SecurityContextHolder.setContext(context);

        // リクエスト情報からセッションを取得
        // まだセッションがない場合は作成
        HttpSession session = request.getSession(true);

        // セッションに認証情報を格納
        // SPRING_SECURITY_CONTEXT_KEY は JSESSIONID からセッション情報を取得する際のキー
        session.setAttribute(
            HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
            context
        );

        response.setStatus(HttpServletResponse.SC_OK);
    }
}
