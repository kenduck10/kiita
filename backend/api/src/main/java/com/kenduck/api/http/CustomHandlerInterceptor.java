package com.kenduck.api.http;

import com.kenduck.api.log.LoggingService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomHandlerInterceptor implements HandlerInterceptor {

    @NonNull
    private final LoggingService loggingService;

    @Override
    public boolean preHandle(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull Object handler
    ) {
        List<HttpMethod> nullBodyExpectedHttpMethods = List.of(HttpMethod.GET, HttpMethod.DELETE);
        if (nullBodyExpectedHttpMethods.contains(HttpMethod.valueOf(request.getMethod()))) {
            loggingService.displayRequestLog(request, null);
        }
        return true;
    }
}
