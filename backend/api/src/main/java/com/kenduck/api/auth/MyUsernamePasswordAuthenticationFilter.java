package com.kenduck.api.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.io.IOException;
import java.util.Date;

/**
 * ユーザー名＆パスワードでのカスタム認証フィルタ
 */
@Slf4j
public class MyUsernamePasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    // 600,000ms = 600s = 10min
    private static final long EXPIRATION_TIME = 1000L * 60L * 10L;
    private final AuthenticationManager authenticationManager;

    /**
     * コンストラクタ
     *
     * @param authenticationManager {@link AuthenticationManager}
     */
    public MyUsernamePasswordAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
        // ログインAPIのパスを設定
        setRequiresAuthenticationRequestMatcher(
                new AntPathRequestMatcher("/api/login", "POST")
        );
        // 認証成功時のレスポンスを設定
        this.setAuthenticationSuccessHandler(((request, response, authentication) -> {

            MyUserDetails myUserDetails = (MyUserDetails) SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getPrincipal();

            // JWT発行日時
            Date issuedAt = new Date();
            // 発行されたJWTの有効開始日時
            Date notBefore = new Date(issuedAt.getTime());
            // 発行されたJWTの有効期限日時
            Date expiresAt = new Date(issuedAt.getTime() + EXPIRATION_TIME);

            String token = JWT.create()
                    .withIssuedAt(issuedAt)
                    .withNotBefore(notBefore)
                    .withExpiresAt(expiresAt)
                    // JWTペイロードに載せたい情報があればwithClaimで追加していく
                    .withClaim("name", myUserDetails.getMember().getName())
                    .sign(Algorithm.HMAC256("secret"));
            response.setHeader("x-auth-token", token);
            response.setStatus(HttpStatus.OK.value());
            response.getWriter().write((new ObjectMapper()).writeValueAsString(myUserDetails.getMember()));
        }
        ));
    }

    /**
     * 認証処理を実行
     *
     * @param request  from which to extract parameters and perform the authentication
     * @param response the response, which may be needed if the implementation has to do a
     *                 redirect as part of a multi-stage authentication process (such as OIDC).
     * @return {@link Authentication}
     */
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

        try {
            LoginRequestBody body = new ObjectMapper()
                    .readValue(
                            request.getInputStream(),
                            LoginRequestBody.class
                    );
            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(body.getName(), body.getPassword())
            );
        } catch (IOException e) {
            // TODO: 500にならない例外ハンドリング追加
            throw new RuntimeException(e);
        }
    }
}
