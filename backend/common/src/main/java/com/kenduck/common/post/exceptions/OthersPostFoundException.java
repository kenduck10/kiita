package com.kenduck.common.post.exceptions;


import lombok.Getter;

@Getter
public class OthersPostFoundException extends RuntimeException {

    private final int postId;

    public OthersPostFoundException(int postId, String message) {
        super(message);
        this.postId = postId;
    }
}
