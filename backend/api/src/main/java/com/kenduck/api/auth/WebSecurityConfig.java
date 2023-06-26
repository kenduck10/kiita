package com.kenduck.api.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * 認証・認可設定
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    /**
     * AuthenticationManager設定
     *
     * @param authenticationConfiguration {@link AuthenticationConfiguration}
     * @return {@link AuthenticationManager}
     * @throws Exception 検査例外
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    /**
     * セキュリティフィルタ設定
     *
     * @param http {@link HttpSecurity}
     * @return {@link SecurityFilterChain}
     * @throws Exception 検査例外
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // 各パスの認可
        http.authorizeHttpRequests(authorize -> authorize
                .requestMatchers(HttpMethod.POST, "/api/login").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/posts").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/posts/*").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/posts/*/comments").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/members").permitAll()
                .requestMatchers("/api/users**").permitAll()
                .anyRequest().authenticated());
        // 認証処理を実施するフィルタ追加
        http.addFilter(new MyUsernamePasswordAuthenticationFilter(
                authenticationManager(
                        http.getSharedObject(AuthenticationConfiguration.class)
                )
        ));
        // 認証完了後に毎回JWTを検証するためのフィルタ追加
        http.addFilterAfter(new MyOncePerRequestFilter(), MyUsernamePasswordAuthenticationFilter.class);
        // JWT認証のためセッション不使用
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        // JWTはCookie保存しないためCSRF設定不要
        http.csrf().disable();
        return http.build();
    }

    /**
     * パスワード暗号化用のエンコーダ設定
     *
     * @return エンコーダ
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
