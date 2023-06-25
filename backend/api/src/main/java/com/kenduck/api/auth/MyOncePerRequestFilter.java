package com.kenduck.api.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.text.StringEscapeUtils;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

/**
 * リクエスト毎に挟むフィルタ
 */
@Slf4j
public class MyOncePerRequestFilter extends OncePerRequestFilter {

    private static final String TOKEN_HEADER_PREFIX = "Bearer ";

    /**
     * フィルタ処理
     * JWTを検証する
     *
     * @param request     リクエスト
     * @param response    レスポンス
     * @param filterChain フィルタチェイン
     */
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        String tokenHeader = request.getHeader("x-auth-token");

        // 認可不要なAPIなどでトークンがない場合はここで抜ける
        if (tokenHeader == null || !tokenHeader.startsWith(TOKEN_HEADER_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = tokenHeader.substring(TOKEN_HEADER_PREFIX.length());
        DecodedJWT decodedJWT = JWT
                .require(Algorithm.HMAC256("secret"))
                .build()
                .verify(token);
        String loginUserJson = decodedJWT.getClaim("loginUser").toString();
        LoginUser loginUser = new ObjectMapper().readValue(
                toReadableJson(loginUserJson),
                LoginUser.class
        );
        SecurityContextHolder.getContext().setAuthentication(
                // ここで詰めた情報がコントローラから参照できる
                new UsernamePasswordAuthenticationToken(loginUser, null, new ArrayList<>())
        );
        filterChain.doFilter(request, response);
    }

    /**
     * claimのJSONをデシリアライズ可能な形式に加工
     *
     * @param json claimのJSON
     * @return 加工後のJSON
     */
    private String toReadableJson(String json) {
        // エスケープ文字を除外
        String unescapedJson = StringEscapeUtils.unescapeJson(json);

        int length = unescapedJson.length();
        // 両端に不要なダブルクォートがあるので除去
        return StringUtils.right(
                StringUtils.left(unescapedJson, length - 1),
                length - 2
        );
    }
}
