package com.kenduck.common.post.exceptions;


import lombok.Getter;

@Getter
public class PostPublicationTimestampNotFoundException extends RuntimeException {

    private final int postId;

    public PostPublicationTimestampNotFoundException(int postId, String message) {
        super(message);
        this.postId = postId;
    }
}
