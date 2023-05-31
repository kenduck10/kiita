package com.kenduck.common.post.exceptions;


import lombok.Getter;

@Getter
public class PostNotFoundException extends RuntimeException {

    private final int postId;

    public PostNotFoundException(int postId, String message) {
        super(message);
        this.postId = postId;
    }
}
