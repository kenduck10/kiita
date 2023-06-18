package com.kenduck.api.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.io.IOException;
import java.util.Date;

@Slf4j
public class MyUsernamePasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    // 600,000ms = 600s = 10min
    private static final Long EXPIRATION_TIME = 1000L * 60L * 10L;
    private final AuthenticationManager authenticationManager;

    public MyUsernamePasswordAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
        setRequiresAuthenticationRequestMatcher(
                new AntPathRequestMatcher("/api/login", "POST")
        );
        this.setAuthenticationSuccessHandler(((request, response, authentication) -> {

            MyUserDetails myUserDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            Date issuedAt = new Date();
            Date notBefore = new Date(issuedAt.getTime());
            Date expiresAt = new Date(issuedAt.getTime() + EXPIRATION_TIME);

            String token = JWT.create()
                    .withIssuedAt(issuedAt)
                    .withNotBefore(notBefore)
                    .withExpiresAt(expiresAt)
                    .withClaim("name", myUserDetails.getMember().getName())
                    .sign(Algorithm.HMAC256("secret"));
            response.setHeader("X-AUTH-TOKEN", token);
            response.setStatus(200);
            response.getWriter().write((new ObjectMapper()).writeValueAsString(myUserDetails.getMember()));
        }
        ));
    }

    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

        try {
            LoginForm loginForm = new ObjectMapper().readValue(request.getInputStream(), LoginForm.class);
            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginForm.getName(), loginForm.getPassword())
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
