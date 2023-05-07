package com.kenduck.api.log;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.MapUtils;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class LoggingService {
    public void displayRequestLog(HttpServletRequest request, Object body) {
        StringBuilder message = new StringBuilder();
        Map<String, String> parameters = getParameters(request);

        message.append("REQUEST ");
        message.append("method = [").append(request.getMethod()).append("]");
        message.append(" path = [").append(request.getRequestURI()).append("] ");

        if (MapUtils.isNotEmpty(parameters)) {
            message.append(" parameters = [").append(parameters).append("] ");
        }

        if (Objects.nonNull(body)) {
            message.append(" body = [").append(body).append("]");
        }
        log.info(message.toString());
    }

    public void displayResponseLog(HttpServletRequest request, HttpServletResponse response, Object body) {
        StringBuilder message = new StringBuilder();
        Map<String, String> headers = getHeaders(response);

        message.append("RESPONSE ");
        message.append(" method = [").append(request.getMethod()).append("]");

        if (MapUtils.isNotEmpty(headers)) {
            message.append(" ResponseHeaders = [").append(headers).append("]");
        }
        message.append(" responseBody = [").append(body).append("]");
        log.info(message.toString());
    }

    private Map<String, String> getHeaders(HttpServletResponse response) {
        Map<String, String> headers = new HashMap<>();
        Collection<String> headerMap = response.getHeaderNames();
        for (String str : headerMap) {
            headers.put(str, response.getHeader(str));
        }
        return headers;
    }

    private Map<String, String> getParameters(HttpServletRequest request) {
        Map<String, String> parameters = new HashMap<>();
        Enumeration<String> params = request.getParameterNames();
        while (params.hasMoreElements()) {
            String paramName = params.nextElement();
            String paramValue = request.getParameter(paramName);
            parameters.put(paramName, paramValue);
        }
        return parameters;
    }
}
