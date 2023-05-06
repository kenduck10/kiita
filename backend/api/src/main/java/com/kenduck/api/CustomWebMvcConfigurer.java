package com.kenduck.api;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class CustomWebMvcConfigurer implements WebMvcConfigurer {

    @NonNull
    private final LoggingHandlerInterceptor loggingHandlerInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry interceptorRegistry) {
        interceptorRegistry.addInterceptor(loggingHandlerInterceptor);
    }
}
