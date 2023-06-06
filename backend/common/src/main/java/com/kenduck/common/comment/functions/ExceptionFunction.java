package com.kenduck.common.comment.functions;

import com.kenduck.common.comment.exceptions.CommentNotFoundException;
import lombok.extern.slf4j.Slf4j;

import java.util.function.Supplier;

@Slf4j
public class ExceptionFunction {

    public static Supplier<CommentNotFoundException> commentNotFoundSupplier(int commentId) {
        return () -> {
            String message = String.format("target comment (id=%d) is not found", commentId);
            log.warn(message);
            return new CommentNotFoundException(commentId, message);
        };
    }
}
