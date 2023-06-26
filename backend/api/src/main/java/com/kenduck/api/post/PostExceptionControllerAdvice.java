package com.kenduck.api.post;

import com.kenduck.common.post.exceptions.OthersPostFoundException;
import com.kenduck.common.post.exceptions.PostNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice(assignableTypes = PostController.class)
public class PostExceptionControllerAdvice extends ResponseEntityExceptionHandler {
    @ExceptionHandler(PostNotFoundException.class)
    protected ResponseEntity<Object> handleUserNotFound(PostNotFoundException exception, WebRequest request) {
        return handleExceptionInternal(exception, null, new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }

    @ExceptionHandler(OthersPostFoundException.class)
    protected ResponseEntity<Object> handleOthersPostFound(OthersPostFoundException exception, WebRequest request) {
        return handleExceptionInternal(exception, null, new HttpHeaders(), HttpStatus.FORBIDDEN, request);
    }
}
