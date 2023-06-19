package com.kenduck.api.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

/**
 * リクエスト毎に挟むフィルタ
 */
public class MyOncePerRequestFilter extends OncePerRequestFilter {

    private static final String TOKEN_HEADER_PREFIX = "Bearer ";

    /**
     * フィルタ処理
     * JWTを検証する
     *
     * @param request     リクエスト
     * @param response    レスポンス
     * @param filterChain フィルタチェイン
     * @throws ServletException {@link ServletException}
     * @throws IOException      {@link IOException}
     */
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        String tokenHeader = request.getHeader("x-auth-token");

        if (tokenHeader == null || !tokenHeader.startsWith(TOKEN_HEADER_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = tokenHeader.substring(TOKEN_HEADER_PREFIX.length());
        DecodedJWT decodedJWT = JWT
                .require(Algorithm.HMAC256("secret"))
                .build()
                .verify(token);
        String name = decodedJWT.getClaim("name").toString();
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(name, null, new ArrayList<>())
        );
        filterChain.doFilter(request, response);
    }
}
