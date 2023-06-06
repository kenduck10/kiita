package com.kenduck.common.comment.exceptions;


import lombok.Getter;

@Getter
public class CommentNotFoundException extends RuntimeException {

    private final int postId;

    public CommentNotFoundException(int postId, String message) {
        super(message);
        this.postId = postId;
    }
}
